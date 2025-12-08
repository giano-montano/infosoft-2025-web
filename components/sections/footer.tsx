import Link from "next/link"
import { NAV_ITEMS } from "@/lib/data/navigation"

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter text-foreground">INFOSOFT</span>
            <span className="text-sm text-muted-foreground">2025</span>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-muted-foreground">© 2025 INFOSOFT. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
