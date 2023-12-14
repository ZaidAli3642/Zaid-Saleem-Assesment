import { Box } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'

import { login } from '../redux/reducers/auth'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import loginSchema from '../validations/loginSchema'
import MediumHeading from '../components/MediumHeading'
import useForm from '../hooks/useForm'

const Login = () => {
  const dispatch = useDispatch()
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ email: '', password: '' })

  const handleLogin = () => {
    console.log('input fields : ', inputFields)
    onSubmit(loginSchema, () => {
      dispatch(login({ data: inputFields }))
    })
  }

  return (
    <Box className='container'>
      <Box className='login-container' paddingX={'30px'}>
        <MediumHeading heading='LOGIN' />
        <Box className='input-container'>
          <Form isInvalid={isInvalid} onSubmit={handleLogin}>
            <Input placeholder={'Email'} onChange={onChange} name='email' error={isInvalid} value={inputFields?.email} helperText={errorMessages?.email} />
            <Input placeholder={'Password'} onChange={onChange} type='password' name='password' error={isInvalid} value={inputFields?.password} helperText={errorMessages?.password} />
            <Button title='Login' />
          </Form>
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
