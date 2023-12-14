import { Box, Button } from '@mui/material'
import React from 'react'
import MediumHeading from '../components/MediumHeading'
import Input from '../components/Input'

const Login = () => {
  return (
    <Box className='container'>
      <Box className='login-container' paddingX={'30px'}>
        <MediumHeading heading='LOGIN' />
        <Box className='input-container'>
          <Input placeholder={'Email'} onChange={e => console.log('OnChange ', e.target.value)} />
          <Input placeholder={'Password'} onChange={e => console.log('OnChange ', e.target.value)} />
          <Button>Login</Button>
        </Box>
        <span className='footer-text'></span>
        <span className='signup-text'>
          No account? <span>Signup</span>
        </span>
      </Box>
    </Box>
  )
}

export default Login
