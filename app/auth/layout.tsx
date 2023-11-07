import { Header } from '@/components/header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sistema Gestor de Trabajos de Grado - Login',
  description: 'Sistema para el seguimiento de trabajos de grado de la carrera de ingenieria en sistema de la pontificia universidad javeriana cali',
}

export default function AnteproyectoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex min-h-screen bg-javeriana-blue">
      {children}
    </main>
  )
}
