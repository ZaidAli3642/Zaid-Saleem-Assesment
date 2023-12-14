import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box } from '@mui/material'

import ProfileAccount from '../components/ProfileAccount'

const ProtectedRoutes = () => {
  const { token } = useSelector(state => state.auth)

  if (!token) return <Navigate to='/login' />

  return (
    <>
      <Box style={{ position: 'fixed', top: 20, right: 50, display: 'flex', gap: '15px' }}>
        <ProfileAccount />
      </Box>

      <Outlet />
    </>
  )
}

export default ProtectedRoutes
