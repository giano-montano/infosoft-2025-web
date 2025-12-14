import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { alexandria } from "@/components/ui/fonts"
import { Header } from "@/components/sections/header"
import logoInfosoft from "@/assets/infosoft_cortado.png"
import { Footer } from "@/components/sections/footer"



export const metadata: Metadata = {
  metadataBase: new URL('https://infosoft.inf.pucp.edu.pe'),
  title: {
    default: "INFOSOFT 2025 | Tecnología, Innovación e Investigación",
    template: "%s | INFOSOFT 2025"
  },
  description:
    "El evento más importante de tecnología e innovación del Perú. Conferencias, talleres y networking con líderes de la industria. 17-19 de Diciembre 2025, Campus PUCP.",
  keywords: ["INFOSOFT", "INFOSOFT 2025", "tecnología", "innovación", "investigación", "PUCP", "conferencia tecnología", "evento tecnológico Perú", "talleres tecnología", "networking tech", "AEDITIP"],
  authors: [
    {name:"AEDITIP", url:"https://www.linkedin.com/company/aeditip/"},
    {name: "Giano Montano", url: "https://www.linkedin.com/in/giano-monta%C3%B1o-8b1537349/"}
  ],
  creator: "Giano Montano",
  publisher: "PUCP - Pontificia Universidad Católica del Perú",
  openGraph: {
    type: 'website',
    locale: 'es_PE',
    url: 'https://infosoft.inf.pucp.edu.pe',
    siteName: 'INFOSOFT 2025',
    title: 'INFOSOFT 2025 | Tecnología, Innovación e Investigación',
    description: 'El evento más importante de tecnología e innovación del Perú. 17-19 de Diciembre 2025, Campus PUCP.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INFOSOFT 2025 | Tecnología, Innovación e Investigación',
    description: 'El evento más importante de tecnología e innovación del Perú. 17-19 de Diciembre 2025, Campus PUCP.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://infosoft.inf.pucp.edu.pe',
  },
  icons: {
    icon: [
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        url: '/icon.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      {/* className={`font-sans antialiased ${_inter.className}`} */}
      <body className={`${alexandria.className} antialiased min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        {/* <Analytics /> */}
        <Footer />
      </body>
    </html>
  )
}
