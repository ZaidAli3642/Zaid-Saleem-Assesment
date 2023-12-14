import * as Yup from 'yup'

const postSchema = Yup.object().shape({
  description: Yup.string().required().label('Description'),
})

export default postSchema
