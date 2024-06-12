import Navbar from '@/components/Navbar';
import FooterComponent from '@/components/Footer';
import './globals.css';
import { Public_Sans as Font } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';


const font = Font({ subsets: ['latin'], weight: ['100','200','300','400','500','600','700','800','900'] });

export const metadata = {
  title: "Canciones - El Poder de la Cruz",
  description: "Iglesia y Fundacion El poder de la Cruz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${font.className} antialiased ` }>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex flex-col md:items-center py-24">
            {children}
          </main>
          <FooterComponent />
        </ThemeProvider>

      </body>
    </html>
  );
}
