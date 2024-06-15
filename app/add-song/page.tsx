'use client'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Tiptap from '@/components/Editor';
import { useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import { sendEmail } from '@/lib/_actions';
export const runtime = 'edge';


export default function AddSongpage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [lyrics, setLyrics] = useState('');
  const lyricsInputRef = useRef<HTMLInputElement | null>(null);

  const handleLyricsChange = (richText: string) => {
    setLyrics(richText);
    if (lyricsInputRef.current) {
      lyricsInputRef.current.value = richText;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const response = await fetch('/api/song', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        //sendEmail("Actualización", formData)
        toast({
          title: '✅ Canción creada con éxito',
          variant: "success"

        });
        router.replace("/song");
        router.refresh();

      } else {
        toast({
          title: `❌ Error: ${result.error}`,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: '❌ Error al crear canción',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <section className="flex flex-col md:container items-center ">
      <h1 className='font-bold items-center md:items-start text-3xl lg:text-5xl'>Cargar Canción</h1>


      <div className="mb-32 text-left w-[80vw] max-w-2xl flex flex-col">

        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full gap-3"
        >
          <div>
            <Label>Nombre</Label>

            <Input
              type="text"
              name="name"
              id="song-name"
              placeholder="Nombre de la cancion"
         
            />
          </div>

          <div>
            <Label >Autor</Label>

            <Input
              type="text"
              name="author"
              id="author"
              placeholder="Hillsong"
          
            />
          </div>

          <div>
            <Label>Rapida/Lenta</Label>

            <Select name='tone' >

              <SelectTrigger>
                <SelectValue placeholder="Selecciona una opción..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rapida">Rapida</SelectItem>
                <SelectItem value="Lenta">Lenta</SelectItem>
                <SelectItem value="Otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label >Nota Hombre</Label>

            <Select name='man' >

              <SelectTrigger>
                <SelectValue placeholder="Selecciona una nota" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Do">Do</SelectItem>
                <SelectItem value="Do#">Do#</SelectItem>
                <SelectItem value="Re">Re</SelectItem>
                <SelectItem value="Re#">Re#</SelectItem>
                <SelectItem value="Mi">Mi</SelectItem>
                <SelectItem value="Fa">Fa</SelectItem>
                <SelectItem value="Fa#">Fa#</SelectItem>
                <SelectItem value="Sol">Sol</SelectItem>
                <SelectItem value="Sol#">Sol#</SelectItem>
                <SelectItem value="La">La</SelectItem>
                <SelectItem value="La#">La#</SelectItem>
                <SelectItem value="Si">Si</SelectItem>

              </SelectContent>
            </Select>
          </div>
          <div>
            <Label >Nota Mujer</Label>

            <Select name='woman' >

              <SelectTrigger>
                <SelectValue placeholder="Selecciona una nota" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Do">Do</SelectItem>
                <SelectItem value="Do#">Do#</SelectItem>
                <SelectItem value="Re">Re</SelectItem>
                <SelectItem value="Re#">Re#</SelectItem>
                <SelectItem value="Mi">Mi</SelectItem>
                <SelectItem value="Fa">Fa</SelectItem>
                <SelectItem value="Fa#">Fa#</SelectItem>
                <SelectItem value="Sol">Sol</SelectItem>
                <SelectItem value="Sol#">Sol#</SelectItem>
                <SelectItem value="La">La</SelectItem>
                <SelectItem value="La#">La#</SelectItem>
                <SelectItem value="Si">Si</SelectItem>

              </SelectContent>
            </Select>
          </div>
          <Tiptap onChange={handleLyricsChange} value='' />

          {/* Campo oculto para las lyrics */}
          <input
            type="hidden"
            name="lyrics"
            ref={lyricsInputRef}
          />



          <div className="flex justify-center p-2 gap-5">
            <Button
              variant={'outline'}
              className='w-32'
              size={'sm'}
              onClick={(e) => {
                e.preventDefault()
                router.back()
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant={'default'}
              className='w-32'
              size={'sm'}
              disabled={isLoading}
            >
              {isLoading ? 'Cargando...' : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
