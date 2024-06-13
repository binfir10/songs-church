import { DeleteButton } from "@/components/DeleteButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSongById } from "@/lib/_actions";

export const runtime = 'edge';
export const revalidate = 0;
import Link from "next/link";
import React, { Suspense } from "react";
import Loading from "./loading";

type PageProps = {
  params: {
    id: string;
  };
};
function replacePWhithBr(lyric: any) {
  const p = lyric.split('<p>').map((item: any) => item.split('</p>')[0]);
  const paragraphProcessed = p.map((paragraph: any, index: any) => {

    if (paragraph.trim() === '') {
      return '<br>'; 
    } else {
      return `<p>${paragraph}</p>`; 
    }
  }).join('');

  return { __html: paragraphProcessed };
}

export default async function Page({ params }: PageProps) {
  console.log(params.id);
  
  const song = await getSongById(params.id);
  if (!song?.lyrics) {
    return null;
  }

  const lyric = replacePWhithBr(song.lyrics);

  return (
    <Suspense fallback={<Loading />}>

    <section className="flex flex-col sm:container gap-5 justify-center px-2 min-[350px]:px-8 2xl:w-9/12">
      <div className="flex justify-between w-11/12 gap-3 max-sm:flex-col">
        <div className="font-bold text-left text-4xl lg:text-5xl flex max-md:flex-col max-md:items-start items-center gap-3 ">
          <h1 className="underline underline-offset-8 decoration-primary/30">   {song?.name}</h1>
       
          <Badge variant="secondary" className="text-base no-underline">
            {song?.author}
          </Badge>
        </div>
        <div className="flex gap-2 flex-col md:flex-row max-w-xs">
          <Button asChild size={"sm"} variant={"outline"}>
            <Link href={`/song/edit/${params.id}`}>Editar</Link>
          </Button>
          <DeleteButton songId={song?.id as string} />
        </div>
  
      </div>
      <div className="flex flex-col gap-1 my-2 ">
        <span className="text-base font-bold">
          Hombre: <Badge variant={"secondary"} className="text-base h-7 max-h-7 bg-primary/20 hover:bg-primary/60">{song?.man || "--"}</Badge>
        </span>
        <span className="text-base font-bold">
          Mujer: <Badge variant={"secondary"} className="text-base h-7 max-h-7 bg-primary/20 hover:bg-primary/60">{song?.woman || "--"}</Badge>
        </span>
      </div>

      <div className="">
        <span>Letra:</span>


          <div dangerouslySetInnerHTML={lyric} className="font-extralight etiquetas"></div>
      </div>

    </section>
          </Suspense>
  );
}
