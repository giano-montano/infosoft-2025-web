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
  title: "INFOSOFT 2025 | Tecnología, Innovación e Investigación",
  description:
    "El evento donde convergen la tecnología, la innovación y la investigación. 17 - 19 de Diciembre 2025, Campus PUCP.",
  authors: [{name:"AEDITIP", url:"https://www.linkedin.com/company/aeditip/"},{ name: "Giano Montano", url: "https://www.linkedin.com/in/giano-monta%C3%B1o-8b1537349/" }],

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
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
