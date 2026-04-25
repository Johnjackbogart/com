export interface BlogPostFrontmatter {
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  published: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  slug: string;
  content: string;
  readingTime: string;
}

export interface BlogPostPreview {
  slug: string;
  title: string;
  date: string;
  description: string;
  coverImage?: string;
  readingTime: string;
}
