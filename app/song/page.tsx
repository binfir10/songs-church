import React, { Suspense } from 'react'
import { DataTable } from '@/components/table/data-table';
import { colums } from '@/components/table/columns';

import Loading from './loading';
import { getAllSongs } from '@/lib/_actions';
export const runtime = 'edge';
export const revalidate = 0;


export default async function page() {
  const { songs } = await getAllSongs();
  const sortedSongs = songs.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section className='flex flex-col md:container  px-3 2xl:w-9/12 '>
      <h1 className='font-bold text-left text-4xl lg:text-5xl'>Canciones</h1>
      <Suspense fallback={<Loading />}>

      <DataTable columns={colums} data={sortedSongs} />
      </Suspense>
    </section>
  )
}
