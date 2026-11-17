import { authAtom } from "@/atoms/auth-atom"
import { useAtom } from "jotai"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"

export function SingUp() {
  const [auth, setAuth] = useAtom(authAtom)
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? "/posts"

  useEffect(() => {
    if (!auth) setAuth(true)
    navigate(from, { replace: true })
  }, [auth, from, navigate, setAuth])

  return <></>
}
