import { useState, type FormEvent } from "react"
import { useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { postsUtils, sanitizeHtml } from "@/lib/posts-utils"

function makeUniqueSlug(title: string): string {
  const base = postsUtils.createSlug(title) || "post"
  const slugs = new Set(postsUtils.getAllPosts().map((post) => post.slug))
  let slug = base
  let suffix = 2

  while (slugs.has(slug)) {
    slug = `${base}-${suffix}`
    suffix += 1
  }

  return slug
}

function CreatePosts() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [content, setContent] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const plainContent = content.replace(/<[^>]*>/g, "").trim()
    if (!title.trim() || !description.trim() || !plainContent) {
      setError("Add a title, a short description, and some content.")
      return
    }

    const slug = makeUniqueSlug(title)
    postsUtils.savePost({
      id: `post-${crypto.randomUUID()}`,
      title: title.trim(),
      slug,
      description: description.trim(),
      content: sanitizeHtml(content),
      author: "You",
      date: new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(new Date()),
    })
    navigate(`/posts/${slug}`)
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-6 p-6">
      <header className="space-y-1">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          New post
        </h1>
        <p className="text-sm text-muted-foreground">
          Write something worth sharing.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Post details</CardTitle>
            <CardDescription>
              The title and description readers see in the list.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="A clear, memorable title"
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="One or two sentences about this post"
                rows={3}
                required
                className="w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>
              Use the toolbar to add headings, links, lists, and images.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SimpleEditor initialContent="" onContentChange={setContent} />
          </CardContent>
        </Card>

        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button type="submit">Publish post</Button>
        </div>
      </form>
    </div>
  )
}

export default CreatePosts
