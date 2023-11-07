
import { Header } from '@/components/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema Gestor de Trabajos de Grado - Anteproyecto',
  description: 'Sistema para el seguimiento de trabajos de grado de la carrera de ingenieria en sistema de la pontificia universidad javeriana cali',
}

export default function AnteproyectoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex flex-col min-h-screen">
      <Header/>
      {children}
    </main>
  )
}
