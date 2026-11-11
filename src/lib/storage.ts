import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { Pool } from "pg";
import { attorneys as initialAttorneys, Attorney } from "@/data/attorneys";
import { defaultSiteSettings } from "@/data/siteDefaults";
import { ConsultationRequest, RequestStatus, SiteSettings } from "@/types/site";

const DATA_DIR = path.join(process.cwd(), "data");
const ATTORNEYS_FILE = path.join(DATA_DIR, "attorneys.json");
const SETTINGS_FILE = path.join(DATA_DIR, "site-settings.json");
const REQUESTS_FILE = path.join(DATA_DIR, "requests.json");

// Simple per-file mutex queue to avoid race conditions on concurrent local writes
const writeQueues = new Map<string, Promise<unknown>>();

function enqueueWrite<T>(filePath: string, task: () => Promise<T>): Promise<T> {
  const previous = writeQueues.get(filePath) ?? Promise.resolve();
  const next = previous.then(task, task);
  writeQueues.set(filePath, next);
  return next;
}

// ---------------------------------------------------------------------------
// Lazy Postgres Pool (used whenever DATABASE_URL / POSTGRES_URL is set)
// ---------------------------------------------------------------------------

function getDatabaseUrl(): string | undefined {
  const raw = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  return raw && raw.trim().length > 0 ? raw.trim() : undefined;
}

let pgPool: Pool | null = null;
let schemaInitPromise: Promise<void> | null = null;

function getPool(): Pool {
  if (!pgPool) {
    const connectionString = getDatabaseUrl();
    if (!connectionString) {
      throw new Error("DATABASE_URL is not configured.");
    }
    const isLocal =
      connectionString.includes("localhost") ||
      connectionString.includes("127.0.0.1");
    pgPool = new Pool({
      connectionString,
      max: 5,
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    });
  }
  return pgPool;
}

async function ensurePostgresSchema(): Promise<void> {
  if (!schemaInitPromise) {
    schemaInitPromise = (async () => {
      const pool = getPool();
      await pool.query(`
        CREATE TABLE IF NOT EXISTS musadqh_attorneys (
          id TEXT PRIMARY KEY,
          sort_order INTEGER NOT NULL,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS musadqh_site_settings (
          id TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );
      `);
      await pool.query(`
        CREATE TABLE IF NOT EXISTS musadqh_requests (
          id TEXT PRIMARY KEY,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          data JSONB NOT NULL
        );
      `);

      // Seed attorneys once if table is empty
      const attCountRes = await pool.query<{ count: string }>(
        "SELECT COUNT(*)::text AS count FROM musadqh_attorneys"
      );
      if (Number(attCountRes.rows[0]?.count ?? "0") === 0) {
        const client = await pool.connect();
        try {
          await client.query("BEGIN");
          for (let i = 0; i < initialAttorneys.length; i++) {
            const item = initialAttorneys[i];
            await client.query(
              `INSERT INTO musadqh_attorneys (id, sort_order, data)
               VALUES ($1, $2, $3::jsonb)
               ON CONFLICT (id) DO NOTHING`,
              [item.id, i, JSON.stringify(item)]
            );
          }
          await client.query("COMMIT");
        } catch (err) {
          await client.query("ROLLBACK");
          throw err;
        } finally {
          client.release();
        }
      }

      // Seed site settings once if missing
      const settingsRes = await pool.query<{ id: string }>(
        "SELECT id FROM musadqh_site_settings WHERE id = 'default'"
      );
      if (settingsRes.rowCount === 0) {
        await pool.query(
          `INSERT INTO musadqh_site_settings (id, data)
           VALUES ('default', $1::jsonb)
           ON CONFLICT (id) DO NOTHING`,
          [JSON.stringify(defaultSiteSettings)]
        );
      }
    })().catch((err) => {
      schemaInitPromise = null;
      throw err;
    });
  }
  return schemaInitPromise;
}

// ---------------------------------------------------------------------------
// Local JSON Helpers (fallback when DATABASE_URL is absent)
// ---------------------------------------------------------------------------

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readOrSeedJson<T>(filePath: string, seedValue: T): Promise<T> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw) as T;
  } catch (err: unknown) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === "ENOENT") {
      try {
        await writeJsonAtomic(filePath, seedValue);
      } catch (writeErr: unknown) {
        const writeCode = (writeErr as NodeJS.ErrnoException)?.code;
        if (writeCode !== "EROFS" && writeCode !== "EACCES") {
          throw writeErr;
        }
      }
      return seedValue;
    }
    if (code === "EROFS" || code === "EACCES") {
      return seedValue;
    }
    throw err;
  }
}

async function writeJsonAtomic<T>(filePath: string, data: T): Promise<void> {
  await ensureDataDir();
  const tmpPath = `${filePath}.${crypto.randomBytes(6).toString("hex")}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmpPath, filePath);
}

function assertWritableLocalOrThrow(): void {
  if (process.env.VERCEL && !getDatabaseUrl()) {
    throw new Error(
      "DATABASE_URL غير مضبوط على Vercel. يرجى ربط قاعدة بيانات PostgreSQL لحفظ البيانات."
    );
  }
}

function buildUniqueSlug(baseName: string, existing: Attorney[]): string {
  const ascii = baseName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const prefix = ascii.length >= 3 ? ascii : `attorney-${Date.now().toString(36)}`;
  let candidate = prefix;
  let counter = 2;
  const taken = new Set(existing.map((a) => a.slug));
  while (taken.has(candidate)) {
    candidate = `${prefix}-${counter++}`;
  }
  return candidate;
}

// ---------------------------------------------------------------------------
// Attorneys Storage
// ---------------------------------------------------------------------------

export async function getAttorneys(): Promise<Attorney[]> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const res = await pool.query<{ data: Attorney }>(
      "SELECT data FROM musadqh_attorneys ORDER BY sort_order ASC"
    );
    return res.rows.map((r) => r.data);
  }
  return readOrSeedJson<Attorney[]>(ATTORNEYS_FILE, initialAttorneys);
}

export async function getPublishedAttorneys(): Promise<Attorney[]> {
  const list = await getAttorneys();
  return list.filter((a) => a.isPublished);
}

export async function createAttorney(
  input: Omit<Attorney, "id" | "slug"> & { slug?: string }
): Promise<Attorney> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const current = await getAttorneys();
    const slug = input.slug?.trim() || buildUniqueSlug(input.nameAr, current);
    const newItem: Attorney = {
      ...input,
      id: `${slug}-${crypto.randomBytes(3).toString("hex")}`,
      slug,
    };
    const maxRes = await pool.query<{ next_order: number }>(
      "SELECT COALESCE(MAX(sort_order), -1) + 1 AS next_order FROM musadqh_attorneys"
    );
    const nextOrder = maxRes.rows[0]?.next_order ?? current.length;
    await pool.query(
      `INSERT INTO musadqh_attorneys (id, sort_order, data, updated_at)
       VALUES ($1, $2, $3::jsonb, NOW())`,
      [newItem.id, nextOrder, JSON.stringify(newItem)]
    );
    return newItem;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(ATTORNEYS_FILE, async () => {
    const current = await readOrSeedJson<Attorney[]>(ATTORNEYS_FILE, initialAttorneys);
    const slug = input.slug?.trim() || buildUniqueSlug(input.nameAr, current);
    const newItem: Attorney = {
      ...input,
      id: `${slug}-${crypto.randomBytes(3).toString("hex")}`,
      slug,
    };
    const updated = [...current, newItem];
    await writeJsonAtomic(ATTORNEYS_FILE, updated);
    return newItem;
  });
}

export async function updateAttorney(
  id: string,
  patch: Partial<Attorney>
): Promise<Attorney | null> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const existingRes = await pool.query<{ data: Attorney }>(
      "SELECT data FROM musadqh_attorneys WHERE id = $1",
      [id]
    );
    const existing = existingRes.rows[0]?.data;
    if (!existing) return null;

    const updatedItem: Attorney = {
      ...existing,
      ...patch,
      id: existing.id,
    };
    await pool.query(
      "UPDATE musadqh_attorneys SET data = $2::jsonb, updated_at = NOW() WHERE id = $1",
      [id, JSON.stringify(updatedItem)]
    );
    return updatedItem;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(ATTORNEYS_FILE, async () => {
    const current = await readOrSeedJson<Attorney[]>(ATTORNEYS_FILE, initialAttorneys);
    const index = current.findIndex((a) => a.id === id);
    if (index === -1) return null;

    const updatedItem: Attorney = {
      ...current[index],
      ...patch,
      id: current[index].id,
    };
    const next = [...current];
    next[index] = updatedItem;
    await writeJsonAtomic(ATTORNEYS_FILE, next);
    return updatedItem;
  });
}

export async function deleteAttorney(id: string): Promise<boolean> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const res = await pool.query("DELETE FROM musadqh_attorneys WHERE id = $1", [id]);
    return (res.rowCount ?? 0) > 0;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(ATTORNEYS_FILE, async () => {
    const current = await readOrSeedJson<Attorney[]>(ATTORNEYS_FILE, initialAttorneys);
    const next = current.filter((a) => a.id !== id);
    if (next.length === current.length) return false;
    await writeJsonAtomic(ATTORNEYS_FILE, next);
    return true;
  });
}

export async function reorderAttorneys(orderedIds: string[]): Promise<Attorney[]> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const current = await getAttorneys();
    const map = new Map(current.map((item) => [item.id, item]));
    const reordered: Attorney[] = [];

    for (const id of orderedIds) {
      const found = map.get(id);
      if (found) {
        reordered.push(found);
        map.delete(id);
      }
    }
    map.forEach((remaining) => reordered.push(remaining));

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      for (let i = 0; i < reordered.length; i++) {
        await client.query(
          "UPDATE musadqh_attorneys SET sort_order = $2, updated_at = NOW() WHERE id = $1",
          [reordered[i].id, i]
        );
      }
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
    return reordered;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(ATTORNEYS_FILE, async () => {
    const current = await readOrSeedJson<Attorney[]>(ATTORNEYS_FILE, initialAttorneys);
    const map = new Map(current.map((item) => [item.id, item]));
    const reordered: Attorney[] = [];

    for (const id of orderedIds) {
      const found = map.get(id);
      if (found) {
        reordered.push(found);
        map.delete(id);
      }
    }
    map.forEach((remaining) => reordered.push(remaining));

    await writeJsonAtomic(ATTORNEYS_FILE, reordered);
    return reordered;
  });
}

// ---------------------------------------------------------------------------
// Site Settings Storage
// ---------------------------------------------------------------------------

export async function getSiteSettings(): Promise<SiteSettings> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const res = await pool.query<{ data: Partial<SiteSettings> }>(
      "SELECT data FROM musadqh_site_settings WHERE id = 'default'"
    );
    return { ...defaultSiteSettings, ...(res.rows[0]?.data ?? {}) };
  }

  const saved = await readOrSeedJson<Partial<SiteSettings>>(SETTINGS_FILE, defaultSiteSettings);
  return { ...defaultSiteSettings, ...saved };
}

export async function saveSiteSettings(patch: Partial<SiteSettings>): Promise<SiteSettings> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const current = await getSiteSettings();
    const next: SiteSettings = {
      ...defaultSiteSettings,
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    await pool.query(
      `INSERT INTO musadqh_site_settings (id, data, updated_at)
       VALUES ('default', $1::jsonb, NOW())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()`,
      [JSON.stringify(next)]
    );
    return next;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(SETTINGS_FILE, async () => {
    const current = await readOrSeedJson<SiteSettings>(SETTINGS_FILE, defaultSiteSettings);
    const next: SiteSettings = {
      ...defaultSiteSettings,
      ...current,
      ...patch,
      updatedAt: new Date().toISOString(),
    };
    await writeJsonAtomic(SETTINGS_FILE, next);
    return next;
  });
}

// ---------------------------------------------------------------------------
// Consultation & Contact Requests Storage
// ---------------------------------------------------------------------------

export async function getRequests(): Promise<ConsultationRequest[]> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const res = await pool.query<{ data: ConsultationRequest }>(
      "SELECT data FROM musadqh_requests ORDER BY created_at DESC"
    );
    return res.rows.map((r) => r.data);
  }

  const list = await readOrSeedJson<ConsultationRequest[]>(REQUESTS_FILE, []);
  return [...list].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function createRequest(input: {
  source: ConsultationRequest["source"];
  fullName: string;
  organization?: string;
  phone: string;
  email: string;
  practiceArea?: string;
  preferredAttorney?: string;
  message?: string;
}): Promise<ConsultationRequest> {
  const now = new Date().toISOString();
  const record: ConsultationRequest = {
    id: `REQ-${Date.now().toString(36).toUpperCase()}-${crypto
      .randomBytes(2)
      .toString("hex")
      .toUpperCase()}`,
    source: input.source,
    fullName: input.fullName.trim(),
    organization: (input.organization ?? "").trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    practiceArea: (input.practiceArea ?? "").trim() || "استشارة قانونية عامة",
    preferredAttorney: input.preferredAttorney?.trim() || undefined,
    message: (input.message ?? "").trim(),
    status: "new",
    adminNotes: "",
    createdAt: now,
    updatedAt: now,
  };

  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    await pool.query(
      "INSERT INTO musadqh_requests (id, created_at, data) VALUES ($1, $2::timestamptz, $3::jsonb)",
      [record.id, now, JSON.stringify(record)]
    );
    return record;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(REQUESTS_FILE, async () => {
    const current = await readOrSeedJson<ConsultationRequest[]>(REQUESTS_FILE, []);
    const next = [record, ...current];
    await writeJsonAtomic(REQUESTS_FILE, next);
    return record;
  });
}

export async function updateRequest(
  id: string,
  patch: { status?: RequestStatus; adminNotes?: string }
): Promise<ConsultationRequest | null> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const existingRes = await pool.query<{ data: ConsultationRequest }>(
      "SELECT data FROM musadqh_requests WHERE id = $1",
      [id]
    );
    const existing = existingRes.rows[0]?.data;
    if (!existing) return null;

    const updatedItem: ConsultationRequest = {
      ...existing,
      ...(patch.status ? { status: patch.status } : {}),
      ...(typeof patch.adminNotes === "string" ? { adminNotes: patch.adminNotes } : {}),
      updatedAt: new Date().toISOString(),
    };
    await pool.query("UPDATE musadqh_requests SET data = $2::jsonb WHERE id = $1", [
      id,
      JSON.stringify(updatedItem),
    ]);
    return updatedItem;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(REQUESTS_FILE, async () => {
    const current = await readOrSeedJson<ConsultationRequest[]>(REQUESTS_FILE, []);
    const index = current.findIndex((r) => r.id === id);
    if (index === -1) return null;

    const updatedItem: ConsultationRequest = {
      ...current[index],
      ...(patch.status ? { status: patch.status } : {}),
      ...(typeof patch.adminNotes === "string" ? { adminNotes: patch.adminNotes } : {}),
      updatedAt: new Date().toISOString(),
    };
    const next = [...current];
    next[index] = updatedItem;
    await writeJsonAtomic(REQUESTS_FILE, next);
    return updatedItem;
  });
}

export async function deleteRequest(id: string): Promise<boolean> {
  if (getDatabaseUrl()) {
    await ensurePostgresSchema();
    const pool = getPool();
    const res = await pool.query("DELETE FROM musadqh_requests WHERE id = $1", [id]);
    return (res.rowCount ?? 0) > 0;
  }

  assertWritableLocalOrThrow();
  return enqueueWrite(REQUESTS_FILE, async () => {
    const current = await readOrSeedJson<ConsultationRequest[]>(REQUESTS_FILE, []);
    const next = current.filter((r) => r.id !== id);
    if (next.length === current.length) return false;
    await writeJsonAtomic(REQUESTS_FILE, next);
    return true;
  });
}
