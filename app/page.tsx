import React from 'react'
import { tursoClient } from '@/lib/tursoClient';
import { DataTable } from '@/components/table/data-table';
import { colums } from '@/components/table/columns';

export const runtime = 'edge';

export const revalidate = 0;

export interface Songs {
  name: string;
  author: string;
  man: string;
  woman: string;
  tone: string;
  id: number;
}
async function getData(): Promise<{ songs: Songs[] }> {
  try {
    const res = await tursoClient().execute('select * from songs;');
    const plainSongs: Songs[] = res.rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      author: row.author,
      man: row.man,
      woman: row.woman,
      tone: row.tone,
    }));

    return {
      songs: plainSongs,
    };
  } catch (error) {
    console.log(error);
    return {
      songs: [],
    };
  }
}

export default async function page() {
  const { songs } = await getData();
  const sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className='flex flex-col md:container max-md:items-center px-3 2xl:w-9/12'>
      <h1 className='font-bold items-center md:items-start text-3xl lg:text-5xl'>Canciones</h1>
      <DataTable columns={colums} data={sortedSongs} />
    </section>
  )
}
