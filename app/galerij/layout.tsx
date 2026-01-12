// app/tarieven/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Galerij | Menno's Koffiebar",
  description: "Neem een kijke in de atmosfeer van: Menno's Koffiebar.",
}

export default function TarievenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}