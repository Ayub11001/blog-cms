import { Link, useParams } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { postsUtils, sanitizeHtml } from "@/lib/posts-utils"

function RenderPost() {
  const { slug } = useParams()
  const post = postsUtils.getPostBySlug(slug)

  if (!post) {
    return (
      <div className="mx-auto flex min-h-svh max-w-3xl flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="font-heading text-2xl font-semibold">Post not found</h1>
        <p className="text-sm text-muted-foreground">
          This post may have been deleted or the link is incorrect.
        </p>
        <Button>
          <Link to="/posts">Back to posts</Link>
        </Button>
      </div>
    )
  }

  return (
    <article className="mx-auto flex min-h-svh max-w-3xl flex-col gap-6 p-6">
      <Button variant="secondary" className="self-start">
        <Link to="/posts">← All posts</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-3xl tracking-tight">
            {post.title}
          </CardTitle>
          <CardDescription>
            {post.author} · {post.date}
          </CardDescription>
          <p className="pt-2 text-sm leading-relaxed text-muted-foreground">
            {post.description}
          </p>
        </CardHeader>
        <CardContent>
          <div
            className="space-y-3 text-sm leading-7 [&_a]:text-primary [&_a]:underline [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_img]:rounded-md [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content) }}
          />
        </CardContent>
      </Card>
    </article>
  )
}

export default RenderPost
