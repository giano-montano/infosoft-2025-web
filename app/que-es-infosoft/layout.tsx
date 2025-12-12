import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '¿Qué es INFOSOFT?',
  description: 'INFOSOFT es el evento líder de tecnología e innovación en Perú. Descubre nuestra historia, misión y el impacto que hemos generado desde 2015 en la comunidad tech.',
  openGraph: {
    title: '¿Qué es INFOSOFT? | INFOSOFT 2025',
    description: 'El evento líder de tecnología e innovación en Perú. Historia, misión y comunidad tech.',
  },
}

export default function QueEsInfosoftLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
