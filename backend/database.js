import pg from 'pg';
const { Pool } = pg;

// SSL configuration for Digital Ocean managed databases
const sslConfig = {
  rejectUnauthorized: false
};

// Use DATABASE_URL if available (Digital Ocean), otherwise use individual env vars
const connectionConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: sslConfig
    }
  : {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 25060,
      database: process.env.DB_NAME || 'defaultdb',
      ssl: sslConfig
    };

const pool = new Pool(connectionConfig);

// Test connection on startup
pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error:', err.message));

export default pool;
