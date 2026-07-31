import Link from "next/link";
import { BentoGrid } from "@/components/bento-grid";
import { Hero } from "@/components/hero";
import { Code2 } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { getPostPreviews } from "@/lib/blog";

export default function HomePage() {
  const latestPosts = getPostPreviews(2);
  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Hero />
        <section>
          <BentoGrid latestPosts={latestPosts} />
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
              <Code2 className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
