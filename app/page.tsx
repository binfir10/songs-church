import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
export const runtime = 'edge';
export const revalidate = 0;

export default async function page() {
  return (
    <section className='flex  md:container flex-col md:flex-row gap-5 items-center justify-between  px-3 2xl:w-11/12  '>
      <div className='flex flex-col gap-5'>
      <h1 className='font-extrabold text-center md:text-left max-[300px]:text-4xl text-5xl sm:text-6xl lg:text-7xl text-foreground'>MINISTERIO <br /> DE ALABANZA</h1>
          <Button asChild variant={'default'}>
        <Link href="/song">
            Ir a Canciones
          </Link>
          </Button>

      </div>
      <div className='w-11/12 md:w-1/2 aspect-auto rounded-md'>

        <Image src="/fondo.jpg" alt='' height={950} width={1000} className='rounded-md'
          placeholder='empty'
          priority={false}/>
      </div>


    </section>
  )
}
