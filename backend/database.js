import pg from 'pg';
const { Pool } = pg;

// Use DATABASE_URL if available (Digital Ocean), otherwise use individual env vars
const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
  : {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 25060,
      database: process.env.DB_NAME || 'defaultdb',
      ssl: { rejectUnauthorized: false }
    };

const pool = new Pool(connectionConfig);

export default pool;
