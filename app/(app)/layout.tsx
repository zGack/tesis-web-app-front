
import { Header } from '@/components/ui'
import React from 'react'

export default function AppLayout({
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
