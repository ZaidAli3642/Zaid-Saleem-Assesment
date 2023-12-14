import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { register, updateUser } from '../redux/reducers/auth'
import Button from '../components/Button'
import Form from '../components/Form'
import Input from '../components/Input'
import MediumHeading from '../components/MediumHeading'
import useForm from '../hooks/useForm'
import profileSchema from '../validations/profileSchema'

const Profile = () => {
  const [errorMessages, isInvalid, inputFields, setInputFields, , onChange, onSubmit] = useForm({ username: '', name: '', email: '', password: '' })
  const { userInfo } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleUpdate = () => {
    onSubmit(
      profileSchema,
      () => {
        dispatch(updateUser({ data: inputFields, user_id: userInfo.id }))
      },
      false,
    )
  }

  useEffect(() => {
    const { username, name, email } = userInfo
    setInputFields({ username, email, name })
  }, [])

  return (
    <Box className='container'>
      <Box className='login-container' paddingX={'30px'}>
        <MediumHeading heading='Profile Info' />
        <Box className='input-container'>
          <Form onSubmit={handleUpdate} isInvalid={isInvalid}>
            <Input placeholder={'Username'} onChange={onChange} name='username' value={inputFields?.username} error={isInvalid} helperText={errorMessages?.username} />
            <Input placeholder={'Name'} onChange={onChange} name='name' value={inputFields?.name} error={isInvalid} helperText={errorMessages?.name} />
            <Input placeholder={'Email'} onChange={onChange} name='email' value={inputFields?.email} error={isInvalid} helperText={errorMessages?.email} />
            <Input placeholder={'Password'} onChange={onChange} name='password' type='password' value={inputFields?.password} error={isInvalid} helperText={errorMessages?.password} />
            <Button title='Update' />
          </Form>
        </Box>
      </Box>
    </Box>
  )
}

export default Profile
