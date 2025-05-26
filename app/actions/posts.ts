'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!title || !content) {
    throw new Error('Título e conteúdo são obrigatórios');
  }

  try {
    const post = await db.createPost(title, content);
    revalidatePath('/');
    return { success: true, post };
  } catch (error) {
    console.error('Erro ao criar post:', error);
    throw new Error('Falha ao criar post');
  }
}

export async function updatePost(formData: FormData) {
  const id = formData.get('id') as string;
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;

  if (!id || !title || !content) {
    throw new Error('ID, título e conteúdo são obrigatórios');
  }

  try {
    const post = await db.updatePost(id, title, content);
    if (!post) throw new Error('Post não encontrado');
    revalidatePath('/');
    return { success: true, post };
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    throw new Error('Falha ao atualizar post');
  }
}

export async function deletePost(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    throw new Error('ID é obrigatório');
  }

  try {
    const success = await db.deletePost(id);
    if (!success) throw new Error('Post não encontrado');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    throw new Error('Falha ao deletar post');
  }
} 