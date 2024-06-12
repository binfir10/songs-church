import { NextResponse, NextRequest } from 'next/server';
import { tursoClient } from '@/lib/tursoClient';
import { URL } from 'url';
export const runtime = 'edge';


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const formData = await req.formData();
    console.log("este es el id",id)
    const { name, author, man, woman, tone, lyrics } = Object.fromEntries(formData);

    if (!name || !author) {
      return NextResponse.json({ error: 'name and author are required' }, { status: 400 });
    }

    if (
      typeof name !== 'string' ||
      typeof author !== 'string' ||
      typeof man !== 'string' ||
      typeof woman !== 'string' ||
      typeof tone !== 'string' ||
      typeof lyrics !== 'string'
    ) {
      return NextResponse.json({ error: 'type no' }, { status: 400 });
    }

    const result = await tursoClient().execute({
      sql: 'UPDATE songs SET name = ?, author = ?, man = ?, woman = ?, tone = ?, lyrics = ? WHERE id = ?',
      args: [name, author, man, woman, tone, lyrics, id],
    });

    return NextResponse.json(
      { message: 'Cancion actualizada con exito' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}


//delete song by id
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const result = await tursoClient().execute({
      sql: 'DELETE FROM songs WHERE id = ?',
      args: [id],
    });

    return NextResponse.json(
      { message: 'Cancion eliminada con exito' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
