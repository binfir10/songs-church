import { NextResponse, NextRequest } from 'next/server';
import { tursoClient } from '@/lib/tursoClient';

export const runtime = 'edge';

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const result = await tursoClient().execute({
      sql: 'DELETE FROM frameworks WHERE id = ?',
      args: [id],
    });

    return NextResponse.json(
      { message: 'Framework deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
