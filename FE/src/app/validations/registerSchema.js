import * as Yup from 'yup'

const registerSchema = Yup.object().shape({
  password: Yup.string().required().min(8).label('Password'),
  email: Yup.string().required().email().label('Email'),
  name: Yup.string().required().label('Name'),
  username: Yup.string().required().min(8).label('Username'),
})

export default registerSchema
