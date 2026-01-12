// app/tarieven/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Offerte Aanvragen | Menno's Koffiebar",
  description: "Jouw event verdient betere koffie. Vraag simpel en snel een offerte aan voor onze mobiele espressobar. Wij regelen de rest.",
}

export default function TarievenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}