
import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';
import type { ContatoCreate } from './types';

export async function POST(req: NextRequest) {
  let client;
  
  try {
    const data: ContatoCreate = await req.json();

    // Validar dados
    if (!data.name || !data.email || !data.phone) {
      return NextResponse.json(
        { success: false, message: 'Nome, email e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    // Obter cliente da pool
    const pool = getDatabase();
    client = await pool.connect();

    // Inserir contato na tabela contatos_novos
    const query = `
      INSERT INTO contatos_novos (nome, email, telefone, mensagem, data_recebimento)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING id;
    `;

    const result = await client.query(query, [
      data.name,
      data.email,
      data.phone,
      data.message || null,
    ]);

    const contatoId = result.rows[0].id;

    return NextResponse.json({ 
      success: true,
      id: contatoId,
      message: 'Contato salvo com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erro interno ao salvar contato.';
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  } finally {
    if (client) {
      client.release();
    }
  }
}