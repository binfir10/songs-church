import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { tursoClient } from '@/lib/tursoClient';
import { ColumnDef } from "@tanstack/react-table"
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
async function getData() {
  try {
    const res = await tursoClient().execute('select * from songs;');
    return {
      songs: res.rows as unknown as Songs[],
    };
  } catch (error) {
    console.log(error);
    return {
      songs: []
    }
  }
}
export default async function page() {
  const { songs } = await getData();
  return (
    <div className='flex flex-col container bg-neutral-100'>
      {songs.map((song) => (
        <Accordion type="single" collapsible key={song.id}>

          <AccordionItem value="item-1" >
            <AccordionTrigger>🎶 {song.name}  - {song.author}</AccordionTrigger>
            <AccordionContent className='flex justify-between gap-1'>
              <div className='flex gap-3'>
                <Badge>
                  🎸 H: {song.man}
                </Badge>
                <Badge>
                  🎸 M: {song.woman}
                </Badge>
              </div>
              <Badge>
                🎵 Original: {song.tone}
              </Badge>
            </AccordionContent>

          </AccordionItem>

        </Accordion>
      ))}
    </div>
  )
}
