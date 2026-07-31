export default function Hero() {
  return (
        <section className="relative text-center py-16 md:py-24 border-b border-border h-[60vh] md:h-[70vh] flex flex-col justify-center items-center">
          {/* The canvas is positioned to fill the section but has no negative z-index */}
          {/* This text container sits on top, but passes mouse events through */}
          <div className="pointer-events-none h-full">
            <div className="flex flex-col relative justify-center gap-2 z-10 h-full">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black dark:text-white/80">
                I love to code!!!!
              </h1>
              <p className="max-w-3xl mx-auto text-base md:text-lg text-black/70 dark:text-white/60">
                Hi :) I'm John! I'm interested in making the world a better
                place
              </p>
            </div>
          </div>
        </section>
  )
}