const Database = require("better-sqlite3");
const express = require('express');
const cors = require('cors');

const corsOptions = {
  origin: [
    'https://gabriele.trainiti.it',
  ],
  methods: ['GET'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Se invii cookie o header di autenticazione
  optionsSuccessStatus: 200 // Risposta per i preflight request su vecchi browser
};

const app = express();
app.use(cors(corsOptions));

const db = new Database('./logs.db', { readonly: true });

const dbAll = (query, params = []) => {
  return new Promise((res, rej) => {
    try {
      const stmt = db.prepare(query);
      const result = stmt.all(params);
      res(result);
    } catch (Error) {
      rej("Database Error");
    }
  });
}

const dbGet = (query, params = []) => {
  return new Promise((res, rej) => {
    try {
      const stmt = db.prepare(query);
      const result = stmt.get(params);
      res(result);
    }
    catch (Error) {
      rej("Database Error");
    }
  });
}

app.get('/api/analytics', async (req, res) => {
  try {
    const totalVisits = await dbGet(
      `SELECT COUNT(*) as tot FROM requests WHERE ip IN (SELECT DISTINCT ip FROM requests)`
    );

    const realVisits = await dbGet(
      `SELECT COUNT(*) as tot FROM requests WHERE ip NOT IN (SELECT DISTINCT ip FROM requests WHERE suspicious = 1)`
    );

    const topRealCountries = await dbAll(
      `SELECT COUNT(*) AS cnt, country FROM requests WHERE ip NOT IN (SELECT DISTINCT ip FROM requests WHERE suspicious = 1) GROUP BY country ORDER BY cnt DESC LIMIT 5`
    );

    const topAttackerCountries = await dbAll(
      `SELECT COUNT(*) AS cnt, country FROM requests WHERE ip IN (SELECT DISTINCT ip FROM requests WHERE suspicious = 1) GROUP BY country ORDER BY cnt DESC LIMIT 5`
    );

    const topAttackEndpoints = await dbAll(
      `SELECT COUNT(*) AS cnt, path FROM requests WHERE path NOT IN ('/', '/favicon.ico') AND ip IN (SELECT DISTINCT ip FROM requests WHERE suspicious = 1) GROUP BY path ORDER BY cnt DESC LIMIT 5`
    );

    const heatmapData = await dbAll(`
      SELECT 
        CAST(strftime('%w', timestamp) AS INTEGER) AS giorno_num,
        CASE CAST(strftime('%w', timestamp) AS INTEGER)
            WHEN 0 THEN 'Sunday'
            WHEN 1 THEN 'Monday'
            WHEN 2 THEN 'Tuesday'
            WHEN 3 THEN 'Wednesday'
            WHEN 4 THEN 'Thursday'
            WHEN 5 THEN 'Friday'
            WHEN 6 THEN 'Saturday'
        END AS giorno_nome,
        CAST(strftime('%H', timestamp) AS INTEGER) AS ora,
        COUNT(*) AS totale_eventi
      FROM requests
      WHERE timestamp IS NOT NULL AND suspicious = 1
      GROUP BY giorno_num, ora
      ORDER BY giorno_num ASC, ora ASC
    `);

    res.json({
      stats: {
        totalVisits: totalVisits ? totalVisits.tot : 0,
        realVisits: realVisits ? realVisits.tot : 0,
        suspiciousVisits: (totalVisits?.tot || 0) - (realVisits?.tot || 0)
      },
      topRealCountries,
      topAttackerCountries,
      topAttackEndpoints,
      heatmapData
    });
  } catch (error) {
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(3001, () => console.log('Server API avviato su http://localhost:3001'));
