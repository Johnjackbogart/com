"use client";

import { motion, type Variants } from "framer-motion";
import { BlogPostCard } from "./blog-post-card";
import type { BlogPostPreview } from "@/lib/types/blog";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

interface BlogListProps {
  posts: BlogPostPreview[];
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white text-black dark:bg-black dark:text-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {posts.map((post, index) => (
        <BlogPostCard key={post.slug} post={post} index={index} />
      ))}
    </motion.div>
  );
}
