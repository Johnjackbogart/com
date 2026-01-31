import { Metadata } from "next";
import Link from "next/link";
import { Github } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { BlogList } from "@/components/blog/blog-list";
import { getPostPreviews } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | John Bogart",
  description:
    "Thoughts on technology, AI, entrepreneurship, and personal growth.",
  openGraph: {
    title: "Blog | John Bogart",
    description:
      "Thoughts on technology, AI, entrepreneurship, and personal growth.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getPostPreviews();

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center py-16 md:py-24 border-b border-border">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-black dark:text-white/80">
            Blog
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg text-black/70 dark:text-white/60">
            Thoughts on technology, AI, entrepreneurship, and personal growth
          </p>
        </section>

        <section className="py-12">
          {posts.length > 0 ? (
            <BlogList posts={posts} />
          ) : (
            <p className="text-center text-black/50 dark:text-white/50">
              No posts yet. Check back soon!
            </p>
          )}
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
