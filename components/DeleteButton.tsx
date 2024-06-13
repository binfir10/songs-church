'use client'

import { deleteSong } from '@/lib/_actions';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { toast } from './ui/use-toast';
import { useState } from 'react';

interface DeleteButtonProps {
  songId: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ songId }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const handleClick = async () => {
    setIsLoading(true)
    const result = await deleteSong(songId);
    if (result?.success) {
      router.replace("/song");
      router.refresh();
      toast({
        title: "✅ Cancion Eliminada"
      })
      setIsLoading(false)
    } else {
      toast({
        title: "❌ No se pudo eliminar",
        variant: "destructive"
      })
      setIsLoading(false)
    }
  };

  return (
    <Button size={"sm"} variant={'destructive'}
      onClick={handleClick} disabled={isLoading}
    >
      {isLoading ? "Eliminando..." : "Eliminar"}
    </Button>
  )
}
