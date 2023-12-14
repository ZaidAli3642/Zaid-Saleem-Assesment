import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoutes = () => {
  const token = useSelector(state => state.auth.token)

  if (!token) return <Navigate to='/login' />

  return <Outlet />
}

export default ProtectedRoutes
