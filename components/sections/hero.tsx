export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-balance">
              El evento donde convergen la tecnología, la innovación y la investigación
            </h1>
          </div>

          {/* Right Content - Event Info & Visual */}
          <div className="flex flex-col items-end gap-8">
            <div className="text-right space-y-2">
              <p className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-foreground">
                18 - 19.12.2025
              </p>
              <p className="text-lg md:text-xl text-muted-foreground">Campus PUCP</p>
            </div>

            {/* Abstract Geometric Shape */}
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-secondary/50 blur-3xl" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                  <path
                    d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-border"
                    fill="none"
                  />
                  <path
                    d="M100 40 L150 70 L150 130 L100 160 L50 130 L50 70 Z"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-muted"
                    fill="none"
                  />
                  <circle cx="100" cy="100" r="30" className="fill-secondary" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
