"use client"

import { useState, useEffect } from "react"

interface AbstractInfosoftFigureProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export default function AbstractInfosoftFigure({ 
  size = 'md',
  className = ''
}: AbstractInfosoftFigureProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(false)

    // Detectar si es dispositivo táctil (sin hover)
    useEffect(() => {
      const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      const prefersNoHover = window.matchMedia('(hover: none)').matches
      setIsTouchDevice(hasTouchSupport || prefersNoHover)
    }, [])

    // Auto-ciclo de animación solo para dispositivos táctiles
    useEffect(() => {
      if (!isTouchDevice) return

      let timeout1: NodeJS.Timeout
      let timeout2: NodeJS.Timeout
      let timeout3: NodeJS.Timeout

      const runCycle = () => {
        // Esperar 3s antes de activar colores
        timeout1 = setTimeout(() => {
          setIsHovered(true)
          
          // Mantener colores por 5s
          timeout2 = setTimeout(() => {
            setIsHovered(false)
            
            // Esperar 1s (para que termine la transición) y repetir
            timeout3 = setTimeout(runCycle, 1000)
          }, 5000)
        }, 2000)
      }

      runCycle()

      return () => {
        clearTimeout(timeout1)
        clearTimeout(timeout2)
        clearTimeout(timeout3)
      }
    }, [isTouchDevice])

    const sizeClasses = {
      sm: 'w-80 h-80',
      md: 'w-96 h-96',
      lg: 'w-[28rem] h-[28rem]',
      xl: 'w-[36rem] h-[36rem]',
      full: 'w-full h-full'
    }

    // Colores base (gris)
    const grayColors = ['#e5e5e5', '#a3a3a3', '#737373', '#404040', '#1a1a1a']
    // Colores hover (coloridos)
    const colorColors = ['#00803c', '#fba527', '#fd1329', '#e7285e', '#a855f7']

    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            <svg 
                viewBox="0 0 500 500" 
                className="w-full h-full"
                style={{
                    filter: 'drop-shadow(0 0 40px rgba(115, 115, 115, 0.3))',
                    overflow: 'visible',
                }}
            >
                <defs>
                    {/* Gradiente con transición CSS */}
                    <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        {[0, 25, 50, 75, 100].map((offset, index) => (
                            <stop 
                                key={offset}
                                offset={`${offset}%`}
                                style={{
                                    stopColor: isHovered ? colorColors[index] : grayColors[index],
                                    transition: 'stop-color 1s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                            />
                        ))}
                    </linearGradient>

                    {/* Filtro de respiración de luz */}
                    <filter 
                        id="glowBreathing"
                        x="-50%" 
                        y="-50%" 
                        width="200%" 
                        height="200%"
                        filterUnits="objectBoundingBox"
                    >
                        <feGaussianBlur stdDeviation="4" result="coloredBlur">
                            <animate
                                attributeName="stdDeviation"
                                values="3;6;3"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </feGaussianBlur>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Grupo rotatorio */}
                <g transform="translate(250, 250)">
                    {/* Círculo invisible para detectar hover Y clicks (área circular completa) */}
                    {/* Solo activar hover manual en dispositivos no táctiles */}
                    <a 
                        href="https://www.pucp.edu.pe" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{ cursor: 'pointer' }}
                    >
                        <circle
                            cx="0"
                            cy="0"
                            r="180"
                            fill="transparent"
                            onMouseEnter={() => !isTouchDevice && setIsHovered(true)}
                            onMouseLeave={() => !isTouchDevice && setIsHovered(false)}
                        />
                    </a>

                    {/* Círculo con degradado animado (solo visual) */}
                    <circle
                        cx="0"
                        cy="0"
                        r="150"
                        fill="none"
                        stroke="url(#mainGradient)"
                        strokeWidth="60"
                        filter="url(#glowBreathing)"
                        opacity="0.98"
                        style={{ pointerEvents: 'none' }}
                    >
                        {/* Rotación del gradiente */}
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 0 0"
                            to="360 0 0"
                            dur="20s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </svg>
        </div>
    )
}