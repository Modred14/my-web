// src/lib/db.js
import pkg from "pg";
const { Pool } = pkg;

const connectionString = process.env.NEON_DATABASE_URL;

if (!connectionString && process.env.NODE_ENV !== "test") {
  // Without a connection string `pg` silently tries localhost, which only
  // shows up later as a confusing "ECONNREFUSED". Say what is actually wrong.
  console.error(
    "[db] NEON_DATABASE_URL is not set. Analytics queries will fail.",
  );
}

// Local databases (development) don't speak SSL; Neon requires it.
function isLocalConnection(url) {
  try {
    const host = new URL(url).hostname;
    return host === "localhost" || host === "127.0.0.1" || host === "::1";
  } catch {
    return false;
  }
}

function createPool() {
  const pool = new Pool({
    connectionString,
    ssl:
      connectionString && isLocalConnection(connectionString)
        ? false
        : { rejectUnauthorized: false }, // required for Neon
    max: 5,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
  });

  // Neon closes idle connections. Without this listener, that "error" event on
  // an idle client is unhandled and takes the whole Node process down.
  pool.on("error", (err) => {
    console.error("[db] idle client error:", err.message);
  });

  return pool;
}

// One pool per server process. In development, hot reloading re-runs this
// module, which would otherwise leak a new pool (and its connections) on
// every save.
const globalForPool = globalThis;
const pool = globalForPool.__modredPgPool ?? createPool();
if (process.env.NODE_ENV !== "production") globalForPool.__modredPgPool = pool;

export default pool;
