import React from 'react'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'

import { register } from '../redux/reducers/auth'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import MediumHeading from '../components/MediumHeading'
import registerSchema from '../validations/registerSchema'
import useForm from '../hooks/useForm'

const Register = () => {
  const [errorMessages, isInvalid, inputFields, , , onChange, onSubmit] = useForm({ username: '', name: '', email: '', password: '' })
  const dispatch = useDispatch()

  const handleRegister = () => {
    onSubmit(
      registerSchema,
      () => {
        dispatch(register({ data: inputFields }))
      },
      false,
    )
  }

  return (
    <Box className='container'>
      <Box className='login-container' paddingX={'30px'}>
        <MediumHeading heading='Register' />
        <Box className='input-container'>
          <Form onSubmit={handleRegister} isInvalid={isInvalid}>
            <Input placeholder={'Username'} onChange={e => onChange(e)} name='username' value={inputFields?.username} error={errorMessages?.username === ''} helperText={errorMessages?.username} />
            <Input placeholder={'Name'} onChange={e => onChange(e)} name='name' value={inputFields?.name} error={errorMessages?.name === ''} helperText={errorMessages?.name} />
            <Input placeholder={'Email'} onChange={e => onChange(e)} name='email' value={inputFields?.email} error={errorMessages?.email === ''} helperText={errorMessages?.email} />
            <Input placeholder={'Password'} onChange={e => onChange(e)} name='password' type='password' value={inputFields?.password} error={errorMessages?.password === ''} helperText={errorMessages?.password} />
            <Button title='Register' />
          </Form>
        </Box>
        <span className='signup-text'>
          Already have an account? <span>Login</span>
        </span>
      </Box>
    </Box>
  )
}

export default Register
