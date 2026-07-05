import pg from 'pg';
const { Pool } = pg;

// Disable SSL certificate validation for Digital Ocean managed databases
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

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

// Columns added by the 2026 questionnaire update (Employment History,
// Family Composition, Profession/Occupation). Idempotent and non-destructive:
// every ALTER uses ADD COLUMN IF NOT EXISTS so it is safe to run on each boot.
const SCHEMA_COLUMNS = [
  ['profession', 'TEXT'],
  ['employment_history', 'TEXT'],
  ['countries_worked', 'TEXT'],
  ['occupation', 'TEXT'],
  ['father_alive', 'TEXT'],
  ['father_current_diseases', 'TEXT'],
  ['father_cause_of_death', 'TEXT'],
  ['father_age_at_death', 'INTEGER'],
  ['mother_alive', 'TEXT'],
  ['mother_current_diseases', 'TEXT'],
  ['mother_cause_of_death', 'TEXT'],
  ['mother_age_at_death', 'INTEGER'],
  ['mate_info', 'TEXT'],
  ['children_info', 'TEXT'],
];

const ensureSchema = async () => {
  for (const [name, type] of SCHEMA_COLUMNS) {
    try {
      await pool.query(
        `ALTER TABLE oguk_medical_records ADD COLUMN IF NOT EXISTS ${name} ${type}`
      );
    } catch (err) {
      console.error(`Schema migration error on column "${name}":`, err.message);
    }
  }
  console.log('Schema migration ensured');
};

// Test connection on startup, then ensure the schema is up to date
pool.query('SELECT NOW()')
  .then(() => {
    console.log('Database connected successfully');
    return ensureSchema();
  })
  .catch(err => console.error('Database connection error:', err.message));

export default pool;
