import { Navigate, Outlet } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
const ProtectedRoutes = () => {
    const {user, isAuthenticated}= useAuthContext()
    if (!isAuthenticated) return <Navigate to='/' replace/>
  return <Outlet/>
}

export default ProtectedRoutes