import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1
      className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-black dark:text-white"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2
      className="text-2xl md:text-3xl font-bold mt-8 mb-3 text-black dark:text-white"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3
      className="text-xl md:text-2xl font-bold mt-6 mb-2 text-black dark:text-white"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p
      className="text-base leading-7 mb-4 text-black/80 dark:text-white/80"
      {...props}
    >
      {children}
    </p>
  ),
  a: ({ href, children, ...props }) => (
    <Link
      href={href || "#"}
      className="underline text-black dark:text-white hover:text-black/70 dark:hover:text-white/70"
      {...props}
    >
      {children}
    </Link>
  ),
  ul: ({ children, ...props }) => (
    <ul
      className="list-disc list-inside mb-4 space-y-2 text-black/80 dark:text-white/80"
      {...props}
    >
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol
      className="list-decimal list-inside mb-4 space-y-2 text-black/80 dark:text-white/80"
      {...props}
    >
      {children}
    </ol>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote
      className="border-l-4 border-black/20 dark:border-white/20 pl-4 italic my-6 text-black/70 dark:text-white/70"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({ children, ...props }) => (
    <code
      className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 text-sm font-mono"
      {...props}
    >
      {children}
    </code>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="bg-black/5 dark:bg-white/10 p-4 overflow-x-auto my-6 text-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  img: ({ src, alt, ...props }) => (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={800}
      height={400}
      className="w-full h-auto my-6"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="border-black/20 dark:border-white/20 my-8" {...props} />
  ),
};
