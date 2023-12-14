import React from 'react'
import { Avatar } from '@mui/material'
import assets from '../assets/assets'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/reducers/auth'

const Feed = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Avatar onClick={() => dispatch(logout())} style={{ cursor: 'pointer', position: 'fixed', top: 20, right: 50 }} src={assets.icons.logout} />
    </>
  )
}

export default Feed
