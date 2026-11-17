export type BlogPost = {
  id: string
  title: string
  slug: string
  content: string
  author: string
  date: string
  description: string
}

const POSTS_KEY = "blog-posts"

const DEFAULT_POSTS: BlogPost[] = [
  {
    id: "seed-react",
    title: "Getting started with React",
    slug: "getting-started-with-react",
    author: "Blog CMS",
    date: "Mar 15, 2024",
    description:
      "Components, props, and state — the ideas behind React in one place.",
    content:
      "<h2>Build with components</h2><p>React lets you split your interface into small, reusable pieces. Each component owns its own state and renders UI from props.</p><p>Start with a single component, then compose it into something bigger.</p>",
  },
  {
    id: "seed-typescript",
    title: "TypeScript patterns that scale",
    slug: "typescript-patterns-that-scale",
    author: "Blog CMS",
    date: "Mar 12, 2024",
    description:
      "A few small habits that keep a growing TypeScript codebase readable.",
    content:
      "<h2>Prefer narrow types</h2><p>Describe the shape of the data you actually use. Narrow types make refactoring safer and give better editor help.</p><ul><li>Use discriminated unions for states</li><li>Let inference work when it can</li><li>Keep shared types close to their source</li></ul>",
  },
  {
    id: "seed-writing",
    title: "Writing for the web",
    slug: "writing-for-the-web",
    author: "Blog CMS",
    date: "Mar 8, 2024",
    description:
      "Short paragraphs, clear headings, and a little breathing room go a long way.",
    content:
      "<h2>Make it easy to scan</h2><p>Most readers skim first. Give every section a descriptive heading and keep paragraphs focused on one idea.</p>",
  },
]

function readSavedPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY)
    if (!raw) return []

    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(
      (post): post is BlogPost =>
        typeof post === "object" &&
        post !== null &&
        typeof (post as BlogPost).id === "string" &&
        typeof (post as BlogPost).slug === "string"
    )
  } catch {
    return []
  }
}

function writeSavedPosts(posts: BlogPost[]): void {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts))
  } catch {
    return
  }
}

export function isDefaultPost(id: string): boolean {
  return DEFAULT_POSTS.some((post) => post.id === id)
}

export function sanitizeHtml(html: string): string {
  const template = document.createElement("template")
  template.innerHTML = html

  template.content
    .querySelectorAll("script, iframe, object, embed, link, meta, style")
    .forEach((element) => element.remove())

  template.content.querySelectorAll("*").forEach((element) => {
    for (const attribute of Array.from(element.attributes)) {
      const isEvent = attribute.name.toLowerCase().startsWith("on")
      const isScriptUrl = /^\s*javascript:/i.test(attribute.value)
      if (isEvent || isScriptUrl) {
        element.removeAttribute(attribute.name)
      }
    }
  })

  return template.innerHTML
}

export const postsUtils = {
  getAllPosts: (): BlogPost[] => [...readSavedPosts(), ...DEFAULT_POSTS],

  savePost: (post: BlogPost): void => {
    const saved = readSavedPosts()
    const index = saved.findIndex((item) => item.id === post.id)
    if (index >= 0) {
      saved[index] = post
    } else {
      saved.unshift(post)
    }
    writeSavedPosts(saved)
  },

  getPostBySlug: (slug?: string): BlogPost | undefined => {
    if (!slug) return undefined
    return postsUtils.getAllPosts().find((post) => post.slug === slug)
  },

  deletePost: (id: string): void => {
    writeSavedPosts(readSavedPosts().filter((post) => post.id !== id))
  },

  createSlug: (title: string): string =>
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-"),
}
