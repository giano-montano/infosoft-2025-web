# INFOSOFT 2025 - Website

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38bdf8)](https://tailwindcss.com/)

Sitio web oficial del evento INFOSOFT 2025 - El evento donde convergen la tecnología, la innovación y la investigación.

🌐 **Producción**: [infosoft.inf.pucp.edu.pe](https://infosoft.inf.pucp.edu.pe)  
📅 **Evento**: 17-19 de Diciembre 2025, Campus PUCP

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Gestión de Contenido](#-gestión-de-contenido)
- [Documentación](#-documentación)

---

## ✨ Características

- **🎨 UI Moderna**: Componentes reutilizables con Radix UI y Tailwind CSS
- **⚡ Performance**: Optimizado con Next.js 16 y React Server Components
- **📱 Responsive**: Diseño adaptativo para móviles, tablets y desktop
- **🌐 SEO Optimizado**: Metadata completa, sitemap, robots.txt y Open Graph
- **🎯 Type-Safe**: TypeScript estricto en todo el proyecto
- **📊 Data-Driven**: Contenido gestionable mediante archivos JSON
- **♿ Accesible**: Componentes ARIA-compliant con Radix UI
- **🎭 Animaciones**: Transiciones fluidas y efectos visuales con CSS/SVG

---

## 🛠 Stack Tecnológico

### Core
- **[Next.js 16](https://nextjs.org/)** - React framework con App Router
- **[React 19](https://react.dev/)** - Biblioteca UI con React Compiler
- **[TypeScript 5](https://www.typescriptlang.org/)** - Tipado estático

### Estilos
- **[Tailwind CSS 4.1](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Componentes base con Radix UI
- **[Radix UI](https://www.radix-ui.com/)** - Primitivos UI accesibles
- **[class-variance-authority](https://cva.style/)** - Variantes de componentes
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Merge de clases Tailwind

### Gestión de Estado y Formularios
- **[React Hook Form](https://react-hook-form.com/)** - Gestión de formularios
- **[Zod](https://zod.dev/)** - Validación de esquemas

### Iconos y Assets
- **[Lucide React](https://lucide.dev/)** - Iconos SVG
- **Google Fonts** - Alexandria font family

### Herramientas de Desarrollo
- **pnpm** - Gestor de paquetes eficiente
- **ESLint** - Linter de código
- **PostCSS** - Transformación de CSS
- **cpx** - Sincronización de archivos

---

## 📦 Requisitos Previos

- **Node.js**: >= 18.x
- **pnpm**: >= 8.x (recomendado) o npm/yarn
- **Git**: Para control de versiones

### Instalación de pnpm

```bash
npm install -g pnpm
```

---

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/giano-montano/infosoft-2025-web.git
cd infosoft-2025-web
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar variables de entorno** (opcional)

```bash
cp .env.example .env
```

Ver [DEPLOYMENT.md](./DEPLOYMENT.md) para configuración detallada.

---

## 💻 Desarrollo

### Iniciar servidor de desarrollo

```bash
pnpm dev
```

El sitio estará disponible en [http://localhost:3000](http://localhost:3000)

### Características del modo desarrollo

- ✅ Hot Module Replacement (HMR)
- ✅ Sincronización automática de imágenes desde `data/images/`
- ✅ React Compiler habilitado
- ✅ TypeScript strict mode

---

## 📜 Scripts Disponibles

```bash
# Desarrollo
pnpm dev              # Inicia servidor de desarrollo (sincroniza imágenes + next dev)
pnpm sync-images      # Sincroniza imágenes desde data/images/ a public/content/images/

# Build y Producción
pnpm build            # Genera build de producción
pnpm start            # Inicia servidor de producción

# Calidad de Código
pnpm lint             # Ejecuta ESLint en todo el proyecto
```

---

## 📁 Estructura del Proyecto

```
infosoft-2025/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout con metadata global
│   ├── page.tsx             # Página principal (Hero)
│   ├── opengraph-image.tsx  # Imagen OG dinámica (1200x630)
│   ├── sitemap.ts           # Sitemap dinámico
│   ├── robots.ts            # Robots.txt dinámico
│   ├── globals.css          # Estilos globales
│   ├── contacto/            # Página de contacto
│   ├── faq/                 # FAQ (placeholder)
│   ├── organizacion/        # Equipo organizador
│   ├── ponentes/            # Speakers del evento
│   ├── programa/            # Programa y horarios
│   └── que-es-infosoft/     # Acerca de INFOSOFT
│
├── components/              # Componentes React
│   ├── sections/           # Componentes de secciones
│   │   ├── header.tsx      # Header fijo con navegación
│   │   ├── hero.tsx        # Hero section
│   │   └── footer.tsx      # Footer con enlaces
│   ├── others/             # Componentes especiales
│   │   └── abstract-infosoft.tsx  # Logo animado SVG
│   └── ui/                 # Componentes UI reutilizables
│       ├── button.tsx
│       ├── card.tsx
│       ├── person-card.tsx
│       ├── section-title.tsx
│       └── ... (40+ componentes shadcn/ui)
│
├── lib/                     # Lógica de negocio y utilidades
│   ├── content.ts          # Funciones para leer JSON (speakers, schedule, etc.)
│   ├── types.ts            # Tipos TypeScript compartidos
│   ├── utils.ts            # Utilidades (cn, etc.)
│   └── data/               # Datos estáticos
│       ├── navigation.ts   # Items del menú de navegación
│       ├── speakers.ts     # Datos de speakers (legacy)
│       ├── schedule.ts     # Datos de horarios (legacy)
│       ├── organization.ts # Datos de equipo (legacy)
│       └── stats.ts        # Estadísticas del evento
│
├── data/                    # Contenido editable (JSON)
│   ├── speakers.json       # Lista de ponentes
│   ├── schedule.json       # Programa de eventos
│   ├── organization.json   # Equipo organizador
│   └── images/             # Imágenes del contenido
│       └── speakers/       # Avatares de ponentes
│
├── public/                  # Assets estáticos
│   ├── content/            # Imágenes sincronizadas automáticamente
│   ├── *.jpg               # Imágenes públicas
│   └── *.svg               # Iconos y logos
│
├── hooks/                   # Custom React hooks
├── assets/                  # Assets importados (logos, etc.)
│
├── next.config.ts          # Configuración de Next.js
├── tsconfig.json           # Configuración de TypeScript
├── tailwind.config.ts      # Configuración de Tailwind CSS (en package.json)
├── postcss.config.mjs      # Configuración de PostCSS
├── components.json         # Configuración de shadcn/ui
├── package.json            # Dependencias y scripts
└── pnpm-lock.yaml          # Lockfile de pnpm
```

---

## 📝 Gestión de Contenido

El contenido del sitio se gestiona mediante archivos JSON en `data/`:

### Speakers (`data/speakers.json`)

```json
[
  {
    "id": "speaker-1",
    "name": "Ana García",
    "role": "CTO",
    "company": "TechCorp",
    "avatar": "speakers/ana-garcia.jpg",
    "talks": [
      {
        "title": "IA en el Futuro",
        "type": "conference"
      }
    ]
  }
]
```

### Schedule (`data/schedule.json`)

```json
[
  {
    "date": "2025-12-17",
    "dayLabel": "Día 1 - Martes",
    "events": [
      {
        "id": "event-1",
        "title": "Inauguración INFOSOFT 2025",
        "location": "Auditorio Principal",
        "time": "09:00 - 10:00",
        "type": "conference",
        "speakerId": "speaker-1"
      }
    ]
  }
]
```

### Organization (`data/organization.json`)

```json
[
  {
    "id": "1",
    "name": "Roberto Sánchez",
    "role": "Director General",
    "area": "Dirección",
    "avatar": "/professional-man-director.jpg",
    "linkedin": "https://linkedin.com/in/..."
  }
]
```

### Agregar Imágenes

1. Colocar imágenes en `data/images/speakers/`
2. Referenciar en JSON: `"avatar": "speakers/nombre.jpg"`
3. Ejecutar `pnpm sync-images` o `pnpm dev` (sincroniza automáticamente)

---

## 📚 Documentación

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitectura técnica y decisiones de diseño
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Guía de despliegue en producción
- **[SEO-IMPLEMENTATION.md](./SEO-IMPLEMENTATION.md)** - Estrategia y configuración SEO
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Guía para contribuidores

---

## 🌐 URLs Importantes

- **Sitio web**: https://infosoft.inf.pucp.edu.pe
- **Sitemap**: https://infosoft.inf.pucp.edu.pe/sitemap.xml
- **Robots**: https://infosoft.inf.pucp.edu.pe/robots.txt
- **OG Image**: https://infosoft.inf.pucp.edu.pe/opengraph-image

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, lee [CONTRIBUTING.md](./CONTRIBUTING.md) antes de enviar un PR.

---

## 📄 Licencia

Este proyecto es propiedad de PUCP. Todos los derechos reservados © 2025.

---

## 👥 Equipo

**Diseño web**: AEDITIP - [LinkedIn](https://www.linkedin.com/company/aeditip/posts/?feedView=all)

**Desarrollo Web**: Giano Montaño (IEEE CS PUCP) - [LinkedIn](https://www.linkedin.com/in/giano-monta%C3%B1o-8b1537349/)

---

## 📞 Soporte

Para issues técnicos: [GitHub Issues](https://github.com/giano-montano/infosoft-2025-web/issues)

---

**Hecho con ❤️ por el equipo de INFOSOFT 2025**
