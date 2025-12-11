import AbstractInfosoftFigure from "../others/abstract-infosoft"

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 md:pt-20 pb-8 md:pb-12 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-balance">
              El evento donde convergen la tecnología, la innovación y la investigación
            </h1>
          </div>

          {/* Right Content - Event Info & Visual */}
          <div className="flex flex-col items-center lg:items-end gap-6 md:gap-8">
            <div className="text-center lg:text-right space-y-1 md:space-y-2">
              <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide text-foreground">
                17 - 19.12.2025
              </p>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Campus PUCP</p>
            </div>

            <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
              <AbstractInfosoftFigure size="full" />
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
