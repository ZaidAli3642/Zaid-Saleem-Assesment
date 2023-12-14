import client from './client'

const auth = () => {
  return {
    register: async data => {
      try {
        const response = await client.post('/register', data)

        return response.data
      } catch (error) {
        throw error
      }
    },
  }
}

export default auth
