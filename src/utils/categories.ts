import { getCollection, type CollectionEntry } from 'astro:content'
import { IdToSlug } from './slug'

/**
 * Represents a simplified blog post for archive/list views
 * 代表归档/列表视图的简化博客文章
 */
export interface Archive {
  title: string
  id: string
  date: Date
  tags?: string[]
}

/**
 * Represents a first-level category
 * 代表一级分类
 */
export interface FirstCategory {
  name: string
  slug: string
  posts: Archive[]
}

/**
 * Represents a second-level category
 * 代表二级分类
 */
export interface SecondCategory {
  name: string
  slug: string
  posts: CollectionEntry<'blog'>[]
}

/**
 * Get all first-level categories with their posts
 * 获取所有一级分类及其文章
 */
export async function getFirstCategories() {
  const allBlogPosts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  const categories = new Map<string, FirstCategory>()

  allBlogPosts.forEach((post) => {
    if (!post.data.first_level_category) return

    const categorySlug = IdToSlug(post.data.first_level_category)

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        name: post.data.first_level_category,
        slug: `/categories/${categorySlug}`,
        posts: []
      })
    }

    categories.get(categorySlug)!.posts.push({
      title: post.data.title,
      id: `/blog/${post.id}`,
      date: new Date(post.data.publishDate),
      tags: post.data.tags
    })
  })

  return categories
}

/**
 * Get all second-level categories with their posts
 * 获取所有二级分类及其文章
 */
export async function getSecondCategories() {
  const allBlogPosts = await getCollection('blog', ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true
  })

  const categories = new Map<string, SecondCategory>()

  allBlogPosts.forEach((post) => {
    if (!post.data.second_level_category || !post.data.first_level_category) return

    const categorySlug = `/categories/${IdToSlug(post.data.first_level_category)}/${IdToSlug(post.data.second_level_category)}`

    if (!categories.has(categorySlug)) {
      categories.set(categorySlug, {
        name: post.data.second_level_category,
        slug: categorySlug,
        posts: []
      })
    }

    categories.get(categorySlug)!.posts.push(post)
  })

  // Sort posts by date (newest first)
  categories.forEach((category) => {
    category.posts.sort((a, b) => {
      return a.data.publishDate > b.data.publishDate ? -1 : 1
    })
  })

  return {
    categoriesMap: categories,
    allPosts: allBlogPosts
  }
}
