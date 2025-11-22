// app/actions.ts

"use server";

import { prisma } from '@/prisma'; 

import { ContatoCreate } from './contatos/types';

export async function salvarContato(data: ContatoCreate) {
  try {
    await prisma.contatos_novos.create({
      data: {
        nome: data.name,
        email: data.email,
        telefone: data.phone,
        mensagem: data.message,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}