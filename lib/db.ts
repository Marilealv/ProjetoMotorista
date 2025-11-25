// lib/db.ts
import { Pool } from 'pg';

let pool: Pool | null = null;

export function getDatabase(): Pool {
  if (!process.env.NEON_DATABASE_URL) {
    throw new Error('NEON_DATABASE_URL environment variable is not set');
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.NEON_DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 60000,
      connectionTimeoutMillis: 10000,
      statement_timeout: 30000, // <-- NOME CORRETO
      application_name: 'motorista-particular',
    });

    pool.on('error', (err) => {
      console.error('Erro inesperado no pool:', err);
      // NÃO ZERA O POOL — isso quebra tudo
    });

    pool.on('connect', () => {
      console.log('Conexão estabelecida com sucesso');
    });
  }

  return pool;
}
