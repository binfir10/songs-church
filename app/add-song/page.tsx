import AddSong from '@/components/create-form';
import { Suspense } from 'react'
import Loading from './loading';
export const runtime = 'edge';

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <AddSong />
    </Suspense>
  )
}
