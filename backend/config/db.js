import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import mockDb from './mockDb.js';

dotenv.config();

let pool;
let useMockDb = false;

// Parse DATABASE_URL if provided, otherwise use individual parameters
const poolConfig = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      keepalives: 1,
      keepalivesIdle: 30
    }
  : {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT) || 5432,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      ssl: { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      keepalives: 1,
      keepalivesIdle: 30
    };

const isConnectionError = (err = {}) => {
  const msg = String(err.message || '').toLowerCase();
  return [
    'timeout',
    'terminat',
    'refused',
    'getaddrinfo',
    'not support ssl'
  ].some(keyword => msg.includes(keyword)) || ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT'].includes(err.code);
};

console.log('🔍 Database Config:', {
  mode: process.env.DATABASE_URL ? 'DATABASE_URL' : 'Individual Parameters',
  host: process.env.DATABASE_URL ? 'Using connection string' : process.env.DATABASE_HOST,
  ssl: 'Enabled with rejectUnauthorized: false',
});

try {
  pool = new Pool(poolConfig);
  
  pool.on('connect', () => {
    console.log('✅ Database connected successfully');
  });
  
  pool.on('error', (err) => {
    console.error('❌ Database error:', err.message);
    useMockDb = true;
  });
  
  // Test connection immediately
  pool.query("SELECT NOW()")
    .then(res => {
      console.log('✅ DB Connected:', res.rows[0]);
      useMockDb = false;
    })
    .catch(err => {
      console.error('❌ DB Error:', err.message);
      console.log('⚠️  Switching to MOCK DATABASE for development/testing');
      useMockDb = true;
    });

} catch (err) {
  console.error('❌ Database pool error:', err.message);
  console.log('⚠️  Using MOCK DATABASE instead');
  useMockDb = true;
}

// Set up delayed check to switch to mock if needed
setTimeout(() => {
  if (useMockDb && pool) {
    console.log('🔄 Upgrading to MOCK DATABASE due to connection failure');
  }
}, 1000);

// Wrapper that falls back to mock DB on connection errors
const wrappedDb = {
  query: async (text, params = []) => {
    if (useMockDb || !pool) {
      return mockDb.query(text, params);
    }
    try {
      return await pool.query(text, params);
    } catch (err) {
      if (isConnectionError(err)) {
        console.warn('⚠️  DB connection issue detected, switching to MOCK DB for this request');
        useMockDb = true;
        return mockDb.query(text, params);
      }
      throw err;
    }
  },
  end: async () => {
    if (pool) {
      try { await pool.end(); } catch (err) { console.error('Pool end error:', err.message); }
    }
  }
};

export default wrappedDb;
