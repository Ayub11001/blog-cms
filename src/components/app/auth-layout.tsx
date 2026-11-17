import { authAtom } from "../../atoms/auth-atom"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { Navigate, Outlet, useLocation, useNavigate } from "react-router"

export function AuthLayout() {
  const [auth, setAuth] = useAtom(authAtom)
  const location = useLocation()
  const navigate = useNavigate()

  if (!auth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    )
  }
  const handleLogout = () => {
    setAuth(false)
    navigate("/login", { replace: true })
  }

  return (
    <div className="relative min-h-svh">
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-4 right-4 z-10"
        onClick={handleLogout}
      >
        Log out
      </Button>
      <Outlet />
    </div>
  )
}
