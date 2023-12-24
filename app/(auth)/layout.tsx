import { AuthBackground } from '@/components/auth'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Sistema Gestor de Trabajos de Grado - Login',
  description: 'Sistema para el seguimiento de trabajos de grado de la carrera de ingenieria en sistema de la pontificia universidad javeriana cali',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // <main className="flex justify-center items-center flex-col min-h-screen bg-javeriana-blue -z-10">
    <main className="grid grid-cols-1 grid-rows-6 min-h-screen bg-javeriana-blue">
      <div className='grid grid-cols-1 row-span-2'>
        <div className='flex flex-col mx-auto items-center justify-center'>
          <h1 className='text-white text-4xl font-semibold'>Sistema Gestor de Trabajos de Grado</h1>
          <h2 className='text-white text-xl font-normal'>Facultad de Ingeniería y Ciencias</h2>
        </div>
      </div>
      <div className='grid row-span-4'>
        {children}
      </div>
      <AuthBackground/>
    </main>
  )
}



