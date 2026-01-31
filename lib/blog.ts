import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost, BlogPostPreview } from "./types/blog";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description,
    coverImage: data.coverImage,
    published: data.published ?? true,
    content,
    readingTime: stats.text,
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map(getPostBySlug)
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostPreviews(limit?: number): BlogPostPreview[] {
  const posts = getAllPosts();
  const previews = posts.map(
    ({ slug, title, date, description, coverImage, readingTime }) => ({
      slug,
      title,
      date,
      description,
      coverImage,
      readingTime,
    })
  );

  return limit ? previews.slice(0, limit) : previews;
}
