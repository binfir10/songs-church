'use client'

import { deleteSong } from '@/lib/_actions';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { toast } from './ui/use-toast';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size={'sm'} className='w-24 md:w-full'>
          Eliminar
          <span className="sr-only">Borrar</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer y eliminará permanentemente la canción.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick} className="bg-destructive text-destructive-foreground hover:bg-destructive/80 ">Continuar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
