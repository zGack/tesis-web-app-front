import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans, Roboto } from 'next/font/google'
import Providers from '@/components/Providers';

const open_sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sistema Gestor de Trabajos de Grado',
  description: 'Sistema para el seguimiento de trabajos de grado de la carrera de ingenieria en sistema de la pontificia universidad javeriana cali',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={open_sans.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  )
}
