import { NextResponse, NextRequest } from 'next/server';
import { tursoClient } from '@/lib/tursoClient';
import { v4 as uuidv4 } from 'uuid';

import Filter from 'bad-words';
import { Songs } from '@/lib/types';


export const runtime = 'edge';


//create song
export async function POST(req: NextRequest) {
    const addNewUrl = req.nextUrl.clone();
  addNewUrl.pathname = '/song';
  try {
    const id = uuidv4();
  const formData = await req.formData();
  const { name, author, man, woman, tone, lyrics } = Object.fromEntries(formData);

  if (!name || !author) {
    NextResponse.redirect(addNewUrl, {
      status: 422,
    });
  }
  if (
    typeof name !== 'string' ||
    typeof author !== 'string' ||
    typeof man !== 'string' ||
    typeof woman !== 'string' ||
    typeof tone !== 'string' ||
    typeof lyrics !== 'string'
  ) {
    return NextResponse.redirect(addNewUrl, {
      status: 422,
    });
  }

  const frameworkExists = await getSongs(name as string);

  if (frameworkExists !== null) {
    return NextResponse.redirect(addNewUrl, { status: 302 });
  }

  const filter = new Filter();
  const add = await tursoClient().execute({
    sql: 'insert into songs(id, name, author, man, woman, tone, lyrics) values(?, ?, ?, ?, ?, ?, ?);',
    args: [id,filter.clean(name), filter.clean(author), man, woman, tone, filter.clean(lyrics)],
  });

  return NextResponse.redirect(addNewUrl, {
    status: 302,
  });
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(addNewUrl, {
      status: 500,
    });
  }
  
}


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
