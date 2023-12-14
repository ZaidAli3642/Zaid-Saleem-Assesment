import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import UnProtectedRoutes from './routes/UnProtectedRoutes'
import ProtectedRoutes from './routes/ProtectedRoutes'
import Feed from './pages/Feed'
import Profile from './pages/Profile'

const Root = () => {
  return (
    <Routes>
      <Route path='/' element={<UnProtectedRoutes />}>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Route>
      <Route path='/' element={<ProtectedRoutes />}>
        <Route path='/feed' element={<Feed />} />
        <Route path='/profile' element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default Root
