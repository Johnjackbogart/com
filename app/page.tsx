import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BentoGrid } from "@/components/bento-grid";
import { Github } from "lucide-react";
import { InteractiveParticleCloud } from "@/components/interactive-particle-cloud";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between border-b border-border">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                <span className="font-bold text-lg hidden sm:inline text-foreground">
                  John Bogart
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <Link
                href="#work"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                Work
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                Contact
              </Link>
            </nav>
            <Button
              variant="outline"
              className="rounded-none border-2 border-foreground hover:bg-foreground hover:text-background"
            >
              AVAILABLE
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="relative text-center py-16 md:py-24 border-b border-border h-[60vh] md:h-[70vh] flex flex-col justify-center items-center">
          {/* The canvas is positioned to fill the section but has no negative z-index */}
          <InteractiveParticleCloud className="absolute inset-0 w-full h-full" />
          {/* This text container sits on top, but passes mouse events through */}
          <div className="relative z-10 pointer-events-none">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-muted-foreground">
              Creative Developer
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-muted-foreground">
              I build raw, effective, and experimental digital experiences. My
              work sits at the intersection of code, design, and art.
            </p>
          </div>
        </section>

        <BentoGrid />
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
        <div className="flex justify-between items-center">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            © 2024 John Jack Bogart
          </p>
          <div className="flex items-center space-x-4">
            <Link
              href="#"
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Resume
            </Link>
            <Link
              href="https://github.com"
              className="text-muted-foreground hover:text-foreground"
            >
              <Github className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
