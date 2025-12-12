# Arquitectura Técnica - INFOSOFT 2025

Este documento describe la arquitectura, patrones de diseño y decisiones técnicas del sitio web de INFOSOFT 2025.

---

## 📑 Tabla de Contenidos

- [Visión General](#visión-general)
- [Arquitectura de Alto Nivel](#arquitectura-de-alto-nivel)
- [Patrones y Principios](#patrones-y-principios)
- [Estructura de Directorios](#estructura-de-directorios)
- [Flujo de Datos](#flujo-de-datos)
- [Componentes](#componentes)
- [Gestión de Estado](#gestión-de-estado)
- [Estilos y Theming](#estilos-y-theming)
- [SEO y Performance](#seo-y-performance)
- [Decisiones Técnicas](#decisiones-técnicas)

---

## Visión General

INFOSOFT 2025 es una aplicación web moderna construida con:
- **Next.js 16** (App Router + React Server Components)
- **TypeScript estricto** para type-safety
- **Tailwind CSS 4** para estilos utility-first
- **shadcn/ui** para componentes accesibles

### Principios de Diseño

1. **Server-First**: Maximizar el uso de Server Components para mejor performance
2. **Type-Safety**: TypeScript estricto en todo el proyecto
3. **Accessibility**: Componentes ARIA-compliant con Radix UI
4. **SEO Optimizado**: Metadata completa y generación dinámica
5. **Data-Driven**: Contenido editable mediante JSON
6. **Component Composition**: Componentes reutilizables y composables

---

## Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────┐
│                    Browser (Client)                      │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React 19 + Next.js 16 (App Router)              │  │
│  │  - Client Components (interactividad)            │  │
│  │  - Server Components (renderizado SSR)           │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────┐
│                  Next.js Server                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  App Router (File-based routing)                 │  │
│  │  - Route Handlers                                │  │
│  │  - Server Actions                                │  │
│  │  - Metadata API                                  │  │
│  └──────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Content Layer (lib/content.ts)                  │  │
│  │  - JSON readers (getSpeakers, getSchedule, etc.) │  │
│  │  - File system operations                        │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────┐
│                  File System (data/)                     │
│  - speakers.json                                         │
│  - schedule.json                                         │
│  - organization.json                                     │
│  - images/                                               │
└─────────────────────────────────────────────────────────┘
```

---

## Patrones y Principios

### 1. Server Components por Defecto

**Patrón**: Usar Server Components para páginas y Client Components solo cuando sea necesario.

```tsx
// ✅ Server Component (por defecto)
export default async function ProgramPage() {
  const schedule = await getSchedule();
  return <ProgramClient schedule={schedule} />;
}

// ✅ Client Component (cuando se necesita interactividad)
"use client";
export default function ProgramClient({ schedule }) {
  const [selectedDay, setSelectedDay] = useState("all");
  // ...
}
```

**Beneficios**:
- Reducción de JavaScript en el cliente
- Mejor performance y SEO
- Acceso directo a datos del servidor

### 2. Data Fetching en el Servidor

**Patrón**: Fetch de datos en Server Components, pasar como props a Client Components.

```tsx
// app/ponentes/page.tsx (Server Component)
export default async function Speakers() {
  const speakers = await getSpeakers();
  return <SpeakersClient speakers={speakers} />;
}
```

**Beneficios**:
- Sin waterfalls de requests
- Datos disponibles en el primer render
- Mejor perceived performance

### 3. Composition Pattern

**Patrón**: Componentes pequeños y composables.

```tsx
<PersonCard
  name={speaker.name}
  role={speaker.role}
  avatar={speaker.avatar}
  linkedin={speaker.linkedin}
/>
```

**Beneficios**:
- Reutilización de código
- Testing más fácil
- Separación de responsabilidades

### 4. Type-Safe Data Layer

**Patrón**: Tipos TypeScript para todos los datos.

```tsx
// lib/types.ts
export interface Speaker {
  id: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  talks?: { title: string; type: EventType }[];
}

// lib/content.ts
export async function getSpeakers(): Promise<Speaker[]> {
  return readJSON<Speaker[]>("speakers.json");
}
```

**Beneficios**:
- Autocompletado en el IDE
- Detección de errores en compile-time
- Documentación implícita

---

## Estructura de Directorios

### Organización por Feature

```
app/
├── layout.tsx           # Layout raíz + metadata global
├── page.tsx             # Homepage (hero)
├── globals.css          # Estilos globales
├── opengraph-image.tsx  # OG image dinámica
├── sitemap.ts           # Sitemap dinámico
├── robots.ts            # Robots.txt dinámico
├── programa/            # Feature: Programa
│   ├── page.tsx         # Server Component
│   └── ProgramClient.tsx # Client Component con filtros
├── ponentes/            # Feature: Speakers
│   └── page.tsx
└── ...
```

### Separación de Concerns

```
lib/
├── content.ts           # Data fetching (I/O operations)
├── types.ts             # TypeScript interfaces
├── utils.ts             # Utilidades puras
└── data/                # Datos estáticos en TS
    ├── navigation.ts
    └── stats.ts

components/
├── ui/                  # Componentes UI reutilizables
├── sections/            # Secciones específicas (Header, Footer)
└── others/              # Componentes especiales
```

---

## Flujo de Datos

### 1. Contenido Dinámico (JSON → UI)

```
data/speakers.json
       ↓
lib/content.ts → getSpeakers()
       ↓
app/ponentes/page.tsx (Server Component)
       ↓
components/ui/person-card.tsx
       ↓
Browser (HTML + CSS)
```

### 2. Interactividad del Cliente

```
User Interaction
       ↓
Client Component State (useState)
       ↓
Re-render with new state
       ↓
Updated UI
```

**Ejemplo**: Filtros en página de Programa

```tsx
// Estado local en cliente
const [selectedDay, setSelectedDay] = useState("all");
const [selectedFormat, setSelectedFormat] = useState("all");

// Filtrado reactivo
const filteredSchedule = schedule
  .filter(day => selectedDay === "all" || day.date === selectedDay)
  .map(day => ({
    ...day,
    events: day.events.filter(event => 
      selectedFormat === "all" || event.type === selectedFormat
    )
  }));
```

### 3. Sincronización de Imágenes

```
data/images/speakers/photo.jpg
       ↓
pnpm dev → cpx sync
       ↓
public/content/images/speakers/photo.jpg
       ↓
Browser: /content/images/speakers/photo.jpg
```

---

## Componentes

### Jerarquía de Componentes

```
app/layout.tsx (Root Layout)
│
├── components/sections/header.tsx
│   └── components/ui/button.tsx
│
├── app/page.tsx (Homepage)
│   ├── components/sections/hero.tsx
│   │   └── components/others/abstract-infosoft.tsx
│   └── components/sections/footer.tsx
│
└── app/ponentes/page.tsx
    └── components/ui/person-card.tsx
        ├── components/ui/avatar.tsx
        └── lucide-react icons
```

### Tipos de Componentes

#### 1. Server Components (por defecto)
- **Uso**: Pages, layouts, fetch de datos
- **Características**: No bundle en cliente, acceso a filesystem
- **Ejemplo**: `app/ponentes/page.tsx`

#### 2. Client Components (`"use client"`)
- **Uso**: Interactividad, state, effects, event listeners
- **Características**: Bundle en cliente, hooks de React
- **Ejemplo**: `app/programa/ProgramClient.tsx`, `components/sections/header.tsx`

#### 3. UI Components (shadcn/ui)
- **Uso**: Componentes reutilizables de UI
- **Características**: Composables, accesibles, customizables
- **Ejemplo**: `components/ui/button.tsx`, `components/ui/card.tsx`

---

## Gestión de Estado

### Estado del Servidor (Server State)

**Método**: React Server Components + Data Fetching

```tsx
// Sin estado del cliente, datos frescos del servidor en cada request
export default async function Page() {
  const data = await getData();
  return <Component data={data} />;
}
```

### Estado del Cliente (Client State)

**Método**: React hooks (`useState`, `useEffect`)

```tsx
"use client";
export default function Interactive() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

### Estado de Formularios

**Método**: React Hook Form + Zod

```tsx
const form = useForm({
  resolver: zodResolver(formSchema),
  defaultValues: { name: "", email: "" }
});
```

---

## Estilos y Theming

### Arquitectura de Estilos

```
app/globals.css
├── @theme (Tailwind 4 inline config)
│   ├── CSS variables (--color-*, --font-*, etc.)
│   └── Base resets
├── @layer base
│   └── Custom base styles
└── Component-specific styles
```

### Tailwind CSS 4.1

**Inline Config en CSS**:
```css
@theme {
  --font-family-sans: Alexandria, system-ui, sans-serif;
  --color-background: #0f0f0f;
  --color-foreground: #fafafa;
}
```

**Ventajas**:
- Configuración en CSS en lugar de JS
- Mejor performance
- Menos archivos de configuración

### shadcn/ui + CVA

**Component Variants**:
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        gradient: "bg-gradient-to-r from-yellow-400 to-pink-500"
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3"
      }
    }
  }
);
```

---

## SEO y Performance

### Metadata API (Next.js 16)

**Static Metadata**:
```tsx
export const metadata: Metadata = {
  title: "INFOSOFT 2025",
  description: "El evento de tecnología...",
  openGraph: { /* ... */ }
};
```

**Dynamic Metadata**:
```tsx
export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();
  return { title: data.title };
}
```

### Generación de Assets SEO

1. **Sitemap Dinámico** (`app/sitemap.ts`):
```tsx
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://infosoft.inf.pucp.edu.pe', priority: 1 },
    // ...
  ];
}
```

2. **Robots.txt** (`app/robots.ts`):
```tsx
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://infosoft.inf.pucp.edu.pe/sitemap.xml'
  };
}
```

3. **OG Image** (`app/opengraph-image.tsx`):
```tsx
export default async function Image() {
  return new ImageResponse(
    <div style={{ /* ... */ }}>INFOSOFT 2025</div>,
    { width: 1200, height: 630 }
  );
}
```

### Performance Optimizations

- ✅ Server Components (menos JS en cliente)
- ✅ Image optimization (`next/image`)
- ✅ Font optimization (`next/font`)
- ✅ React Compiler (memoización automática)
- ✅ Static Generation donde sea posible
- ✅ Edge Runtime para OG images

---

## Decisiones Técnicas

### 1. ¿Por qué Next.js 16?

**Decisión**: Next.js App Router con React Server Components

**Razones**:
- Server Components para mejor performance
- Built-in optimizaciones (images, fonts, metadata)
- File-based routing simplificado
- Soporte nativo para TypeScript
- Ecosystem maduro

**Trade-offs**:
- Curva de aprendizaje para paradigma servidor/cliente
- Algunas bibliotecas solo funcionan en cliente

### 2. ¿Por qué Tailwind CSS 4?

**Decisión**: Tailwind CSS con inline config

**Razones**:
- Utility-first = velocidad de desarrollo
- Purge automático de CSS no usado
- Theming con CSS variables
- Excelente DX con IntelliSense

**Trade-offs**:
- Clases largas en JSX
- Requiere familiaridad con utilidades

### 3. ¿Por qué shadcn/ui?

**Decisión**: shadcn/ui sobre bibliotecas de componentes tradicionales

**Razones**:
- Copy/paste en lugar de node_modules
- Customización total del código
- Accesibilidad con Radix UI
- Sin dependencia de versiones

**Trade-offs**:
- Más archivos en el proyecto
- Updates manuales de componentes

### 4. ¿Por qué JSON para contenido?

**Decisión**: Archivos JSON en `/data` en lugar de CMS

**Razones**:
- Simplicidad (sin BD, sin API)
- Control de versiones con Git
- Type-safety con TypeScript
- Sin costos de hosting adicionales

**Trade-offs**:
- No hay UI de admin
- Edición manual de archivos
- Rebuild necesario para cambios

### 5. ¿Por qué pnpm?

**Decisión**: pnpm en lugar de npm/yarn

**Razones**:
- Ahorro de espacio en disco (symlinks)
- Instalación más rápida
- Strict peer dependencies
- Compatible con npm

**Trade-offs**:
- Menos común que npm (aunque cada vez más popular)

---

## Diagrama de Flujo Completo

```
User Request → Next.js Server
                    ↓
           [Server Component]
           ├── getData() from JSON
           ├── Generate Metadata
           └── Render to HTML
                    ↓
           [Streaming HTML to Browser]
                    ↓
           [Hydration + Client Components]
           ├── Event Listeners
           ├── State Management
           └── Interactivity
                    ↓
           [User Interaction]
                    ↓
           [Re-render (React)]
```

---

## Próximos Pasos / Mejoras Futuras

### Corto Plazo
- [ ] Agregar tests (Jest + React Testing Library)
- [ ] Implementar CMS headless (opcional)
- [ ] Añadir analytics (Vercel Analytics)

### Largo Plazo
- [ ] PWA con Service Workers
- [ ] Internacionalización (i18n)
- [ ] Dark mode dinámico
- [ ] API endpoints para integraciones

---

## Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/react/use-server)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-alpha)
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)

---

**Última actualización**: Diciembre 2025
