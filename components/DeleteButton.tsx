'use client'
import { DeleteSong } from '@/lib/getData';
import React from 'react'
import { Button } from './ui/button';

interface DeleteButtonProps {
  songId: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ songId }) => {
  return (
    <Button size={"sm"} variant={'destructive'}
      onClick={() => DeleteSong(songId)}
    >
      Eliminar
    </Button>
  )
}
