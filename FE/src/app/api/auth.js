import client from './client'

const auth = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  }
  return {
    register: async data => {
      try {
        const response = await client.post('/register', data)

        return response.data
      } catch (error) {
        throw error
      }
    },
    login: async data => {
      try {
        const response = await client.post('/login', data)

        return response.data
      } catch (error) {
        throw error
      }
    },
    updateUser: async (data, user_id) => {
      try {
        const response = await client.put(`/update_user?user_id=${user_id}`, data, { headers })

        return response.data
      } catch (error) {
        throw error
      }
    },
  }
}

export default auth
