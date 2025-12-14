'use client'; // tiene sentido aquí porque el header maneja estado para el menú móvil

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Ticket } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/data/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import logoInfosoft from '@/assets/infosoft_cortado.png'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const pathname = usePathname();


  return (
    <header className='fixed w-full top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md '>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='flex items-center justify-between h-16 md:h-20 mt-0.5'>
          {/* Logo */}
          <Link href='/' className='flex items-center mt-1 '>
            <Image src={logoInfosoft}
              alt='INFOSOFT Logo'
              width={75}
            />
            {/* <span className='text-xl md:text-2xl font-bold tracking-tighter text-foreground'>INFOSOFT</span> */}
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden lg:flex items-center gap-0'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm h-12 w-45 flex items-center justify-center transition-all duration-300 ease-in-out',
                  pathname === item.href 
                    ? 'bg-white text-black font-medium' 
                    : 'text-neutral-400 hover:text-foreground hover:bg-neutral-700'
                )}
              >
                {item.label}
              </Link>
            ))}

            <a  
                target='_blank' 
                rel='noopener noreferrer'
                href='https://luma.com/bl6vwnic'
                className='relative text-sm h-12 w-45 flex items-center justify-center text-neutral-400 font-medium overflow-hidden group'
              >
                <span className='absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out'></span>
                <span className='relative z-10 group-hover:text-white transition-colors duration-300 ease-in-out'>Entradas</span>
              </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className='lg:hidden p-2 text-foreground'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle menu'
          >
            {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={cn(
            'lg:hidden overflow-hidden transition-all duration-300',
            isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0',
          )}
        >
          <div className='flex flex-col gap-4 mt-6'>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-neutral-400 hover:text-foreground transition-all duration-300'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            <a
                href='https://luma.com/bl6vwnic'
                target='_blank'
                rel='noopener noreferrer'
                className='text-center py-3 rounded-md bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500                 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg'
                onClick={() => setIsMenuOpen(false)}
              >
                Obtener entradas
              </a>
          </div>
        </nav>
      </div>
    </header>
  )



            //   <Button
            //   asChild
            //   variant='gradient'
            //   size='default'
            //   className='h-10 px-6 gap-2 ml-6'
            // >
            //   <Link href='www.pucp.edu.pe' 
            //   className=' flex items-center justify-center
            //   text-white
            //   '>
            //     {/* <Ticket className='w-4 h-4' /> */}
            //     Entradas
            //   </Link>
            // </Button>
}
