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

    console.log('Tentando conectar ao banco de dados...');

    // Obter cliente da pool com retry
    const pool = getDatabase();
    client = await pool.connect();
    
    console.log('Conexão estabelecida. Inserindo contato...');

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

    console.log('Contato inserido com sucesso. ID:', contatoId);

    return NextResponse.json({ 
      success: true,
      id: contatoId,
      message: 'Contato salvo com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao salvar contato:', error);
    
    let errorMessage = 'Erro interno ao salvar contato.';
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Mensagens mais amigáveis para erros comuns
      if (error.message.includes('Connection terminated')) {
        errorMessage = 'Erro de conexão com o banco de dados. Tente novamente em alguns segundos.';
      } else if (error.message.includes('timeout')) {
        errorMessage = 'A requisição demorou muito. Por favor, tente novamente.';
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = 'Não foi possível conectar ao banco de dados.';
      }
    }
    
    return NextResponse.json(
      { success: false, message: errorMessage },
      { status: 500 }
    );
  } finally {
    if (client) {
      try {
        client.release();
      } catch (e) {
        console.error('Erro ao liberar cliente:', e);
      }
    }
  }
}