import * as Yup from 'yup'

const loginSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label('Password'),
  email: Yup.string().required().email().label('Email'),
})

export default loginSchema
