"use client" // tiene sentido aquí porque el header maneja estado para el menú móvil

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { NAV_ITEMS } from "@/lib/data/navigation"
import { cn } from "@/lib/utils"
import Image from "next/image"
import logoInfosoft from '@/assets/infosoft_cortado.png'
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = usePathname();


  return (
    <header className="fixed w-full top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20 mt-0.5">
          {/* Logo */}
          <Link href="/" className="flex items-center mt-1 ">
            <Image src={logoInfosoft}
              alt="INFOSOFT Logo"
              width={75}
            />
            {/* <span className="text-xl md:text-2xl font-bold tracking-tighter text-foreground">INFOSOFT</span> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center ">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm  transition-colors
                h-12 w-48 flex items-center justify-center
            ${pathname === item.href ? 'bg-white text-black font-medium  ' 
              : 'text-muted-foreground hover:text-foreground'}
                  `}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0",
          )}
        >
          <div className="flex flex-col gap-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
