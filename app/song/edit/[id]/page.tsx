'use client'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Tiptap from '@/components/Editor';
import { useRef, useState, useEffect, Suspense } from 'react';

import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { getSongById } from '@/lib/_actions';
import Loading from './loading';

export const runtime = 'edge';



export default function EditSongPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    tone: '',
    man: '',
    woman: '',
    lyrics: ''
  });

  const lyricsInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const song = await getSongById(params.id);
      if (song) {
        setFormData({
          name: song.name,
          author: song.author,
          tone: song.tone,
          man: song.man,
          woman: song.woman,
          lyrics: song.lyrics
        });
      }
    };

    fetchData();
  }, [params.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLyricsChange = (richText: string) => {
    setFormData(prevState => ({
      ...prevState,
    }));
    if (lyricsInputRef.current) {
      lyricsInputRef.current.value = richText;
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault(); // Prevent the default form submission
    const data = new FormData();
    data.append('name', formData.name);
    data.append('author', formData.author);
    data.append('tone', formData.tone);
    data.append('man', formData.man);
    data.append('woman', formData.woman);
    data.append('lyrics', formData.lyrics);
    console.log("console log data:", data)
    try {
      const res = await fetch(`/api/song/${params.id}`, {
        method: 'PUT',
        body: data,
      });
      console.log("console log res:",res)
      if (res.ok) {
        router.push('/song')
        revalidatePath('/song')

        return { success: true };
      } else {
        const errorData = await res.json();
        console.error('Error updating song:', errorData);
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error('Error updating Song:', error);
      return { success: false, error: 'Unexpected error occurred' };
    }
   
  };

  return (
    <Suspense fallback={<Loading />}>

    <section className="flex flex-col md:container items-center ">
      <h1 className='font-bold items-center md:items-start text-3xl lg:text-5xl'>Editar Canción</h1>

      <div className="mb-32 text-left w-[80vw] max-w-2xl flex flex-col">
        <form
          onSubmit={ handleSubmit}
          className="flex flex-col w-full gap-3"
        >
          <div>
            <Label>Nombre</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nombre de la cancion"
              required
            />
          </div>

          <div>
            <Label>Autor</Label>
            <Input
              type="text"
              name="author"
              id="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Hillsong"
              required
            />
          </div>

          <div>
            <Label>Rapida/Lenta</Label>
            <Select
              name="tone"
              value={formData.tone}
              onValueChange={(value) => handleSelectChange('tone', value)}
            >
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
            <Label>Nota Hombre</Label>
            <Select
              name="man"
              value={formData.man}
              onValueChange={(value) => handleSelectChange('man', value)}
            >
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
            <Label>Nota Mujer</Label>
            <Select
              name="woman"
              value={formData.woman}
              onValueChange={(value) => handleSelectChange('woman', value)}
            >
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

          <Tiptap onChange={handleLyricsChange} value={formData.lyrics} />

          {/* Campo oculto para las lyrics */}
          <input
            type="hidden"
            value={formData.lyrics}
            name="lyrics"
            ref={lyricsInputRef}
          />

          <div className="flex justify-center p-2">
            <Button
              type="submit"
              variant={'default'}
              title="View Orders"
            >
              <span>Enviar</span>
            </Button>
          </div>
        </form>
      </div>
      </section>
    </Suspense>

  );
}
