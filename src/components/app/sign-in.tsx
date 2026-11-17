import { useAtom } from "jotai"
import { useEffect, useRef, useState, type FormEvent } from "react"
import { useLocation, useNavigate } from "react-router"

import { authAtom } from "@/atoms/auth-atom"
import { Button } from "@/components/ui/button"

function getReturnTo(state: unknown): string {
  if (typeof state !== "object" || state === null || !("from" in state)) {
    return "/posts"
  }

  const from = (state as { from?: unknown }).from
  if (
    typeof from !== "string" ||
    !from.startsWith("/") ||
    from.startsWith("//")
  ) {
    return "/posts"
  }

  return from
}

export function SingUp() {
  const [auth, setAuth] = useAtom(authAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const returnTo = getReturnTo(location.state)
  const [email, setEmail] = useState("demo@example.com")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (auth) {
      navigate(returnTo, { replace: true })
    }
  }, [auth, navigate, returnTo])

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    []
  )

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    timer.current = setTimeout(() => {
      setAuth(true)
      navigate(returnTo, { replace: true })
    }, 500)
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-6">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to manage your posts.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm"
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Demo mode — any email and password work.
        </p>
      </div>
    </div>
  )
}
