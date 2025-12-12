import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con el equipo de INFOSOFT 2025. Resuelve tus dudas sobre el evento, patrocinios, entradas y más.',
  openGraph: {
    title: 'Contacto | INFOSOFT 2025',
    description: 'Contacta con el equipo organizador de INFOSOFT 2025. Estamos aquí para ayudarte.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
