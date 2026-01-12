// app/tarieven/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Let's Connect | Menno's Koffiebar",
  description: "Klaar voor échte koffie op je event? Stuur ons een berichtje en we fixen een voorstel op maat. Let's brew something great.",
}

export default function TarievenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}