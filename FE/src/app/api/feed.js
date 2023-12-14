import client from './client'

const feed = authToken => {
  const headers = {
    Authorization: `Bearer ${authToken}`,
  }
  return {
    savePost: async data => {
      try {
        const response = await client.post('/post', data, { headers })

        return response.data
      } catch (error) {
        throw error
      }
    },
    fetchPosts: async () => {
      try {
        const response = await client.get('/posts', { headers })

        return response.data
      } catch (error) {
        throw error
      }
    },
    editPost: async (data, post_id) => {
      try {
        const response = await client.put(`/post?post_id=${post_id}`, data, { headers })

        return response.data
      } catch (error) {
        throw error
      }
    },
    deletePost: async post_id => {
      try {
        const response = await client.delete(`/post?post_id=${post_id}`, { headers })

        return response.data
      } catch (error) {
        throw error
      }
    },
  }
}

export default feed
