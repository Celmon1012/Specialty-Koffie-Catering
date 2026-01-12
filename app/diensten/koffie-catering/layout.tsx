// app/tarieven/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Specialty Koffie Catering | Menno's Koffiebar",
  description: "De beste koffiebar ervaring, maar dan op jouw locatie. Wij serveren specialty coffee op events, bruiloften en bij bedrijven.",
}

export default function TarievenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}