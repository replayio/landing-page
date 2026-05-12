'use server'

import { BlogPost, getBlogPosts } from '~/lib/notion-blog'

export const loadMoreBlogPosts = async (
  offset: number,
  limit: number
): Promise<{ posts: BlogPost[]; total: number }> => {
  const safeOffset = Math.max(0, Math.floor(offset) || 0)
  const safeLimit = Math.max(1, Math.min(100, Math.floor(limit) || 0))

  const all = await getBlogPosts()
  return {
    posts: all.slice(safeOffset, safeOffset + safeLimit),
    total: all.length
  }
}

export const loadAllBlogPosts = async (): Promise<BlogPost[]> => {
  return getBlogPosts()
}
