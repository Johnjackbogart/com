import Link from "next/link";
import { BentoGrid } from "@/components/bento-grid";
import { Github } from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="relative text-center py-16 md:py-24 border-b border-border h-[60vh] md:h-[70vh] flex flex-col justify-center items-center">
          {/* The canvas is positioned to fill the section but has no negative z-index */}
          {/* This text container sits on top, but passes mouse events through */}
          <div className="pointer-events-none h-full">
            <div className="flex flex-col relative justify-between z-10 h-full">
              <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white/80 dark:text-black">
                Athlete | Creative | Founder
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-white/60 dark:text-black/70">
                Hi :) I'm John! I'm interested in making the world a better
                place
              </p>
            </div>
          </div>
        </section>

        <section>
          <BentoGrid />
        </section>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border">
        <div className="flex justify-between items-center">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            © 2025 John Jack Bogart
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="/resume.pdf"
              download="John_Bogart_Resume.pdf"
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
            >
              Resume
            </a>
            <Link
              href="https://github.com/johnjackbogart"
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
