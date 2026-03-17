import pool from "@/lib/db";

export async function GET() {
  try {
    // Example: get total visits per day
    const result = await pool.query(`
 SELECT DATE(created_at) as day, COUNT(DISTINCT session_id) as visits
FROM analytics_events
GROUP BY DATE(created_at)
ORDER BY day;
    `);

    const visitsPerDay = result.rows;

    // Device breakdown
    const devicesResult = await pool.query(`
   SELECT DATE(created_at) as day, device, COUNT(DISTINCT session_id) as count
FROM analytics_events
GROUP BY DATE(created_at), device;
    `);

    const devices = devicesResult.rows.map((d) => ({
      device: d.device || "Unknown",
      count: Number(d.count) || 0,
    }));

    // Browser breakdown
    const browsersResult = await pool.query(`
SELECT
  DATE(created_at) as day,
  browser,
 COUNT(DISTINCT session_id) as count
FROM analytics_events
GROUP BY DATE(created_at), browser;
    `);

    const browsers = browsersResult.rows.map((b) => ({
      browser: b.browser || "Unknown",
      count: Number(b.count) || 0,
    }));

    // Referrers
    const referrersResult = await pool.query(`
SELECT
  DATE(created_at) as day,
  referrer,
  COUNT(DISTINCT session_id) as count
FROM analytics_events
GROUP BY DATE(created_at), referrer;    `);

    const referrers = referrersResult.rows;

    // Countries
    const countriesResult = await pool.query(`
SELECT
  DATE(created_at) as day,
  COALESCE(location->>'country_name','Unknown') AS country,
COUNT(DISTINCT session_id) AS count
FROM analytics_events
GROUP BY
  DATE(created_at),
  COALESCE(location->>'country_name','Unknown')
ORDER BY day;
`);

    const countries = countriesResult.rows;

    // Average session duration per day
    const sessionDurationResult = await pool.query(`
SELECT DATE(created_at) AS day,
       AVG(duration) AS seconds
FROM analytics_events
WHERE event_type = 'session_end'
GROUP BY DATE(created_at)
ORDER BY day;
`);

    const averageSessionDuration = sessionDurationResult.rows;
    return new Response(
      JSON.stringify({
        visitsPerDay,
        devices,
        browsers,
        referrers,
        countries,
        averageSessionDuration,
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "Failed to fetch analytics" }),
      { status: 500 },
    );
  }
}
