// lib/db.ts
import { Pool } from 'pg';

let pool: Pool | null = null;

function getPool(): Pool {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error('NEON_DATABASE_URL environment variable is not set');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.NEON_DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      // Configurações otimizadas para Vercel
      max: 5, // Limite de conexões simultâneas
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('Erro inesperado no pool de conexão:', err);
      pool = null; // Reset pool em caso de erro
    });
  }
  return pool;
}

export async function queryDatabase(query: string, values?: (string | number | boolean | null)[]) {
  const client = await getPool().connect();
  try {
    const result = await client.query(query, values);
    return result.rows;
  } finally {
    client.release();
  }
}

export function getDatabase(): Pool {
  return getPool();
}

export default pool;
