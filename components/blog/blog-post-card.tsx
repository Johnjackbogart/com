"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPostPreview } from "@/lib/types/blog";

const MotionCard = motion(Card);

interface BlogPostCardProps {
  post: BlogPostPreview;
  index?: number;
}

export function BlogPostCard({ post, index = 0 }: BlogPostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <MotionCard
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="rounded-none !bg-white !text-black dark:!bg-black dark:!text-white"
    >
      {post.coverImage && (
        <div className="aspect-video bg-neutral-800">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={500}
            height={300}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}
      <CardHeader className="border-b border-black/10 p-4 dark:border-white/20">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg text-black dark:text-white">
            {post.title}
          </h3>
          <Badge
            variant="outline"
            className="rounded-none border-black/20 text-black/60 dark:border-white/30 dark:text-white/80"
          >
            BLOG
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-black/70 dark:text-white/80 mb-4">
          {post.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-black/50 dark:text-white/50">
          <span>{formattedDate}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime}
          </span>
        </div>
      </CardContent>
      <CardFooter className="border-t border-black/10 p-4 dark:border-white/20">
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center font-bold text-sm uppercase tracking-wider text-black dark:text-white hover:underline"
        >
          Read More <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </CardFooter>
    </MotionCard>
  );
}
