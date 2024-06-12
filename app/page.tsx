import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'
export const runtime = 'edge';
export const revalidate = 0;

export default async function page() {
  return (
    <section className='flex flex-col md:container gap-5  px-3 2xl:w-9/12  items-center justify-center '>
      <h1 className='font-bold text-left text-4xl lg:text-5xl'>Página Principal</h1>
      <div>
          <Button asChild>
        <Link href="/song">
            Ir a Canciones
          </Link>
          </Button>

      </div>

    </section>
  )
}
