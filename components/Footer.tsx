import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="z-10  py-3 w-full flex mx-auto items-center justify-center border-t border-primary/30 bg-primary/5 ">
      <p className='text-foreground font-semibold'>
        &copy; {new Date().getFullYear()} El poder de la Cruz
      </p>

    </footer>
  );
}
