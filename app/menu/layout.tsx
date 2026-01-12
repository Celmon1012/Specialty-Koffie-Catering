// app/tarieven/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Menu | Menno's Koffiebar",
  description: "Meer dan alleen een koffie. Ontdek onze specialty coffee, thee, matcha en meer.",
}

export default function TarievenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}