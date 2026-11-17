import { useState } from "react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { isDefaultPost, postsUtils, type BlogPost } from "@/lib/posts-utils"

function Posts() {
  const [posts, setPosts] = useState<BlogPost[]>(() => postsUtils.getAllPosts())

  const deletePost = (id: string) => {
    postsUtils.deletePost(id)
    setPosts((current) => current.filter((post) => post.id !== id))
  }

  return (
    <div className="mx-auto flex min-h-svh max-w-5xl flex-col gap-8 p-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Posts
          </h1>
          <p className="text-sm text-muted-foreground">
            Stories and notes from your CMS.
          </p>
        </div>
        <Button>
          <Link to="/create-post">New post</Link>
        </Button>
      </header>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <h2 className="text-lg font-medium">No posts yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Create your first post to get started.
          </p>
          <Button className="mt-4">
            <Link to="/create-post">Create post</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post.id} className="h-full">
              <CardHeader>
                <CardTitle className="text-base tracking-normal normal-case">
                  {post.title}
                </CardTitle>
                <CardDescription>
                  {post.author} · {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col gap-4">
                <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  <Button size="sm" variant="secondary">
                    <Link to={`/posts/${post.slug}`}>Read</Link>
                  </Button>
                  {!isDefaultPost(post.id) && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deletePost(post.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Posts
