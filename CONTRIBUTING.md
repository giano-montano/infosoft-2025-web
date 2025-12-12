# Guía de Contribución - INFOSOFT 2025

¡Gracias por tu interés en contribuir al sitio web de INFOSOFT 2025! Este documento proporciona las directrices para contribuir al proyecto.

---

## 📑 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Reporte de Bugs](#reporte-de-bugs)
- [Solicitud de Features](#solicitud-de-features)

---

## Código de Conducta

Este proyecto se adhiere a un código de conducta profesional. Al participar, te comprometes a:

- Ser respetuoso y considerado con otros colaboradores
- Aceptar críticas constructivas de manera profesional
- Enfocarte en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

---

## Cómo Contribuir

### Tipos de Contribuciones

Aceptamos los siguientes tipos de contribuciones:

1. **Corrección de Bugs** 🐛
2. **Nuevas Features** ✨
3. **Mejoras de Documentación** 📝
4. **Optimizaciones de Performance** ⚡
5. **Mejoras de UI/UX** 🎨
6. **Tests** ✅

### Áreas de Contribución

- **Frontend**: Componentes React, estilos, animaciones
- **Contenido**: Actualizar datos en archivos JSON
- **SEO**: Mejorar metadata y estrategia
- **Accesibilidad**: Mejorar ARIA labels y navegación por teclado
- **Documentación**: README, guías, comentarios en código

---

## Configuración del Entorno

### 1. Fork y Clone

```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/infosoft-2025-web.git
cd infosoft-2025-web

# Agregar upstream remote
git remote add upstream https://github.com/giano-montano/infosoft-2025-web.git
```

### 2. Instalar Dependencias

```bash
# Instalar pnpm si no lo tienes
npm install -g pnpm

# Instalar dependencias del proyecto
pnpm install
```

### 3. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo (si existe)
cp .env.example .env
```

### 4. Iniciar Servidor de Desarrollo

```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:3000`

---

## Estándares de Código

### TypeScript

- **Strict Mode**: Mantener TypeScript en modo estricto
- **Tipos Explícitos**: Preferir tipos explícitos sobre `any`
- **Interfaces**: Definir interfaces para props y datos

```tsx
// ✅ Bueno
interface ButtonProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  children: React.ReactNode;
}

// ❌ Evitar
function Button(props: any) { ... }
```

### React

#### Componentes

- **Functional Components**: Usar siempre functional components
- **Server Components por defecto**: Solo usar `"use client"` cuando sea necesario
- **Props destructuring**: Desestructurar props en la firma

```tsx
// ✅ Bueno
export default function Button({ variant, onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}

// ❌ Evitar
export default function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

#### Naming Conventions

- **Componentes**: PascalCase (`PersonCard.tsx`)
- **Hooks**: camelCase con prefijo `use` (`useMedia.ts`)
- **Utilidades**: camelCase (`formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`MAX_ITEMS`)

### Estilos

#### Tailwind CSS

- **Ordenar clases**: Layout → Spacing → Typography → Visual → Interactive
- **Usar `cn()`**: Para clases condicionales
- **Responsive**: Mobile-first (sin prefijo para móvil)

```tsx
// ✅ Bueno
<div className={cn(
  "flex items-center gap-4",
  "px-4 py-2",
  "text-lg font-semibold",
  "bg-primary rounded-lg",
  "hover:bg-primary/90 transition-colors",
  isActive && "ring-2 ring-accent"
)} />

// ❌ Evitar clases mezcladas
<div className="hover:bg-primary/90 px-4 flex bg-primary text-lg" />
```

### Archivos y Carpetas

- **Componentes**: `components/ui/button.tsx`
- **Pages**: `app/programa/page.tsx`
- **Utilidades**: `lib/utils.ts`
- **Tipos**: `lib/types.ts`
- **Datos**: `data/speakers.json`

---

## Proceso de Pull Request

### 1. Crear Branch

```bash
# Actualizar main
git checkout main
git pull upstream main

# Crear feature branch
git checkout -b feature/nombre-descriptivo
# o
git checkout -b fix/nombre-del-bug
```

### 2. Hacer Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Features
git commit -m "feat: agregar filtro por fecha en programa"

# Bug fixes
git commit -m "fix: corregir overflow en card de speaker"

# Documentación
git commit -m "docs: actualizar README con nuevos scripts"

# Estilos
git commit -m "style: mejorar spacing en hero section"

# Refactoring
git commit -m "refactor: extraer lógica de filtrado a hook"

# Performance
git commit -m "perf: optimizar carga de imágenes con lazy loading"

# Tests
git commit -m "test: agregar tests para PersonCard"
```

### 3. Push y Pull Request

```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Crear PR en GitHub
```

### 4. Descripción del PR

Incluir en la descripción:

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## ¿Cómo se ha probado?
Descripción de cómo se probaron los cambios.

## Checklist
- [ ] El código sigue los estándares del proyecto
- [ ] He agregado comentarios en código complejo
- [ ] La documentación ha sido actualizada
- [ ] No hay warnings en la consola
- [ ] El build de producción funciona (`pnpm build`)
```

### 5. Review Process

- Esperar review de los maintainers
- Responder a comentarios y hacer cambios solicitados
- Una vez aprobado, el PR será merged

---

## Reporte de Bugs

### Antes de Reportar

1. Buscar en [issues existentes](https://github.com/giano-montano/infosoft-2025-web/issues)
2. Verificar que el bug persiste en la última versión
3. Intentar reproducir el bug en modo incógnito

### Template de Bug Report

```markdown
## Descripción del Bug
Descripción clara y concisa del bug.

## Pasos para Reproducir
1. Ir a '...'
2. Click en '...'
3. Scroll hasta '...'
4. Ver error

## Comportamiento Esperado
Qué debería suceder.

## Comportamiento Actual
Qué sucede actualmente.

## Screenshots
Si aplica, agregar screenshots.

## Entorno
- OS: [ej. Windows 11]
- Browser: [ej. Chrome 120]
- Versión de Node: [ej. 18.17.0]

## Información Adicional
Cualquier contexto adicional sobre el problema.
```

---

## Solicitud de Features

### Template de Feature Request

```markdown
## Descripción de la Feature
Descripción clara de la feature propuesta.

## Problema que Resuelve
¿Qué problema resuelve esta feature?

## Solución Propuesta
Descripción de cómo debería funcionar.

## Alternativas Consideradas
Otras soluciones que se consideraron.

## Información Adicional
Mockups, ejemplos, etc.
```

---

## Estructura de Commits

### Tipos de Commits

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| `feat` | Nueva feature | `feat: agregar página de FAQ` |
| `fix` | Bug fix | `fix: corregir enlace roto en footer` |
| `docs` | Documentación | `docs: actualizar guía de contribución` |
| `style` | Formato de código | `style: aplicar Prettier a todos los archivos` |
| `refactor` | Refactoring | `refactor: simplificar lógica de filtros` |
| `perf` | Performance | `perf: lazy load de imágenes` |
| `test` | Tests | `test: agregar tests unitarios` |
| `chore` | Tareas de mantenimiento | `chore: actualizar dependencias` |

---

## Testing

### Ejecutar Tests (cuando estén implementados)

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Coverage
pnpm test:coverage
```

### Escribir Tests

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click me</Button>);
    screen.getByText('Click me').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
```

---

## Preguntas Frecuentes

### ¿Puedo contribuir sin saber TypeScript?

Sí, puedes contribuir actualizando:
- Contenido en archivos JSON (`data/`)
- Documentación (`.md` files)
- Estilos CSS/Tailwind

### ¿Cuánto tiempo toma el review de un PR?

Generalmente 1-3 días hábiles. Para cambios urgentes, mencionar en el PR.

### ¿Qué hago si mi PR tiene conflictos?

```bash
# Actualizar tu branch con main
git checkout main
git pull upstream main
git checkout tu-branch
git rebase main

# Resolver conflictos
# Luego
git push --force-with-lease origin tu-branch
```

### ¿Puedo trabajar en un issue asignado a otra persona?

No, espera a que sea liberado o contacta al maintainer.

---

## Recursos

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## Contacto

**Maintainers**:
- Giano Montaño - [@giano-montano](https://github.com/giano-montano)

**Preguntas**: Abrir un issue con label `question`

---

## Licencia

Al contribuir, aceptas que tus contribuciones serán licenciadas bajo la misma licencia del proyecto.

---

**¡Gracias por contribuir a INFOSOFT 2025! 🚀**
