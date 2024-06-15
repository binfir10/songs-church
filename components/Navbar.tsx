'use client'
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toogle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icons } from "./ui/icons";
import { useState } from "react";

const link = [
  {
    name: "Inicio",
    href: "/",
    icon: <Icons.home />,
  },
  {
    name: "Canciones",
    href: "/song",
    icon: <Icons.songs />,
  },
  {
    name: "Agregar",
    href: "/add-song",
    icon: <Icons.addSong />,
  },
];

export default function Navbar() {
  return (
    <>
      <NavbarMobile />
      <NavbarDesktop />
    </>
  );
}

function NavbarDesktop() {
  return (
    <header className="hidden md:block">
      <nav className="fixed left-0 top-0 flex w-screen border-b border-primary/30 backdrop-blur-sm justify-around h-16 z-10">
        <ul className="py-2 px-4 flex  items-center justify-around md:justify-between text-foreground font-bold w-full md:w-2/3">
          {link.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:underline  flex items-end gap-1 justify-center tracking-wide font-light">
              <span>{item.icon }</span>
              {item.name}
            </Link>
          ))}
          <ModeToggle />
        </ul>
      </nav>
    </header>
  );
}

function NavbarMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <header className="block md:hidden">
      <nav className="fixed left-0 top-0 flex w-screen border-b border-primary/30 backdrop-blur-sm justify-between px-4 items-center h-16 z-10">
        <Link
          href="/"
          className="hover:underline  flex flex-col items-center  justify-center tracking-wide font-light">
          <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M120-513.33V-840h326.67v326.67H120ZM120-120v-326.67h326.67V-120H120Zm393.33-393.33V-840H840v326.67H513.33Zm0 393.33v-326.67H840V-120H513.33ZM186.67-580H380v-193.33H186.67V-580ZM580-580h193.33v-193.33H580V-580Zm0 393.33h193.33V-380H580v193.33Zm-393.33 0H380V-380H186.67v193.33ZM580-580Zm0 200Zm-200 0Zm0-200Z" /></svg><span className="text-sm">Inicio</span> 
        </Link>
        <ul className="flex items-center gap-3">
          <ModeToggle />

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger>{<Icons.menu /> }</SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetDescription>
                  {link.slice(1).map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="hover:underline flex items-center gap-1 justify-center tracking-wide font-light "
                      onClick={handleClose}
                    >
                      {item.name}
                      <span>{item.icon}</span>
                 
                    </Link>
                  ))}
                </SheetDescription>
               
              </SheetHeader>
              
            </SheetContent>
          </Sheet>
        </ul>
      </nav>
    </header>
  );
}
