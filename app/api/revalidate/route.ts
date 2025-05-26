import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { tag, token } = await request.json();

  if (token !== process.env.REVALIDATE_TOKEN) {
    return NextResponse.json({ message: 'Token inválido' }, { status: 401 });
  }

  try {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, message: `Cache com tag ${tag} revalidado` });
  } catch (error) {
    return NextResponse.json({ message: 'Erro ao revalidar cache' }, { status: 500 });
  }
} 