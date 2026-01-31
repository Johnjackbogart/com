import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock, Calendar, Github } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Navbar } from "@/components/navbar";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { mdxComponents } from "@/components/blog/mdx-components";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.title} | John Bogart`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <article className="max-w-3xl mx-auto">
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-black/70 dark:text-white/70 mb-6">
              {post.description}
            </p>
            <div className="flex items-center gap-6 text-sm text-black/50 dark:text-white/50">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readingTime}
              </span>
            </div>
          </header>

          {post.coverImage && (
            <div className="aspect-video mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          )}

          <div className="max-w-none">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>
      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-border mt-12">
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
