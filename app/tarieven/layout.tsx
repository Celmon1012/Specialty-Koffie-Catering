// app/tarieven/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Tarieven Koffie Catering | Menno's Koffiebar",
  description: "Geen slappe bakken, maar échte specialty coffee op je event. Check onze pakketten voor koffie catering op locatie. Let's brew something great.",
}

export default function TarievenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}