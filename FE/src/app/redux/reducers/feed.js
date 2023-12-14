import { createSlice } from '@reduxjs/toolkit'

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    loading: false,
    postsLoading: false,
    error: null,
  },
  reducers: {
    fetchPosts: (state, action) => {
      state.postsLoading = true
      state.error = null
    },
    fetchPostsSuccess: (state, action) => {
      state.postsLoading = false
      state.error = null
      state.posts = action.payload.posts
    },
    fetchPostsFailed: (state, action) => {
      state.postsLoading = false
      state.error = action.payload.error
    },
    publishPost: (state, action) => {
      state.loading = true
      state.error = null
    },
    publishPostSuccess: (state, action) => {
      const { post } = action.payload
      state.loading = false
      state.error = null
      state.posts.unshift(post)
    },
    publishPostFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
  },
})

export const { fetchPostsFailed, fetchPostsSuccess, fetchPosts, publishPost, publishPostFailed, publishPostSuccess } = feedSlice.actions
export default feedSlice.reducer
