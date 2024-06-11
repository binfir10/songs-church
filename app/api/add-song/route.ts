import { NextResponse, NextRequest } from 'next/server';
import { tursoClient } from '@/lib/tursoClient';

import Filter from 'bad-words';
import { Songs } from '@/app/page';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const { name, author, man, woman } = Object.fromEntries(formData);

  // Create redirect url
  const addNewUrl = req.nextUrl.clone();
  addNewUrl.pathname = '/add-song';

  if (!name || !author) {
    NextResponse.redirect(addNewUrl + '?error=Fill in all fields!', {
      status: 422,
    });
  }
  if (
    typeof name !== 'string' ||
    typeof author !== 'string' ||
    typeof man !== 'string' ||
    typeof woman !== 'string'
  ) {
    return NextResponse.redirect(addNewUrl + '?error=Wrong Types', {
      status: 422,
    });
  }

  const frameworkExists = await getSongs(name as string);

  if (frameworkExists !== null) {
    return NextResponse.redirect(addNewUrl, { status: 302 });
  }

  const filter = new Filter();
  const add = await tursoClient().execute({
    sql: 'insert into songs(name, author, man, woman) values(?, ?, ?, ?);',
    args: [filter.clean(name), filter.clean(author), man, woman],
  });

  return NextResponse.redirect(addNewUrl + '?message=Canción Agregada!', {
    status: 302,
  });
}

/**
 * @description Gets framework from the database by filtering the name and url columns
 * @param name Name of the framework being fetched
 * @param url GitHub url of the framework being fetched
 * @returns {Promise<Framework|null>}
 */
async function getSongs(name: string): Promise<Songs | null> {
  const response = await tursoClient().execute({
    sql: 'select * from songs where name = ?',
    args: [name],
  });

  if (response.rows.length) {
    return response.rows[0] as unknown as Songs;
  }
  return null;
}
