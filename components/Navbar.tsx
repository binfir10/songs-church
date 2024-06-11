import Image from 'next/image';
import Link from 'next/link';
import { ModeToggle } from './mode-toogle';
import { Home, HomeIcon, MicVocal } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 flex w-screen border-b border-primary/30 backdrop-blur-sm justify-around ">
      <div className="py-2 px-4 flex  items-center justify-around md:justify-between text-foreground font-bold w-full md:w-2/3">
        <Link
          href="/"
          className="hover:underline hover:text-primary"
          title="Home"
        >
          <Home />
        </Link>


        <Link
          href="/add-song"
          className="hover:underline hover:text-primary flex items-center tracking-wide"
          title="Add New"
        >
          <MicVocal className='w-5 h-5 mr-1' />
          Crear
        </Link>

        <ModeToggle />

      </div>
    </nav>
  );
}
