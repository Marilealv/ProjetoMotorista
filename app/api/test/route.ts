import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const dbUrl = process.env.NEON_DATABASE_URL;
    
    if (!dbUrl) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'NEON_DATABASE_URL não configurada',
          env: Object.keys(process.env).filter(k => k.includes('NEON') || k.includes('DATABASE'))
        },
        { status: 500 }
      );
    }

    // Testar conexão
    const { Pool } = require('pg');
    const pool = new Pool({
      connectionString: dbUrl,
      ssl: {
        rejectUnauthorized: false,
      },
      connectionTimeoutMillis: 5000,
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    pool.end();

    return NextResponse.json({
      success: true,
      message: 'Conexão com banco de dados estabelecida com sucesso!',
      timestamp: result.rows[0].now,
    });
  } catch (error) {
    console.error('Erro de teste:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'Erro ao conectar no banco de dados',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
