import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const UnProtectedRoutes = () => {
  const token = useSelector(state => state.auth.token)

  return token ? <Navigate to='/feed' /> : <Outlet />
}

export default UnProtectedRoutes
