'use client'

import { deleteSong } from '@/lib/_actions';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface DeleteButtonProps {
  songId: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ songId }) => {
  const router = useRouter()
  const handleClick = async () => {
    const result = await deleteSong(songId);
    if (result?.success) {
      alert("eliminado");
      router.push('/song')
      revalidatePath('/song')
    } else {
      alert('Error: ');
    }
  };

  return (
    <Button size={"sm"} variant={'destructive'}
      onClick={handleClick}
    >
      Eliminar
    </Button>
  )
}
