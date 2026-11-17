import { authAtom } from "../../atoms/auth-atom"
import { useAtom } from "jotai"
import { Navigate, Outlet, useLocation } from "react-router"

export function AuthLayout() {
  const [auth] = useAtom(authAtom)
  const location = useLocation()

  if (!auth) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search + location.hash }}
      />
    )
  }
  return <Outlet />
}
