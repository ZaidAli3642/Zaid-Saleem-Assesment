import { createSlice } from '@reduxjs/toolkit'

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
    loading: false,
    postsLoading: false,
    error: null,
    isEditPost: false,
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
    editPost: (state, action) => {
      state.loading = true
      state.error = null
    },
    editPostSuccess: (state, action) => {
      state.loading = false
      state.error = null
      const updatedPost = action.payload.post
      state.posts = state.posts.map(post => (post.id === updatedPost.id ? updatedPost : post))
    },
    editPostFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    deletePost: (state, action) => {
      state.loading = true
      state.error = null
    },
    deletePostSuccess: (state, action) => {
      state.loading = false
      state.error = null
      const deletedPost = action.payload.post
      const posts = [...state.posts]
      const index = posts.findIndex(post => post.id === deletedPost.id)
      posts.splice(index, 1)
      state.posts = posts
    },
    deletePostFailed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
    },
    setIsEdit: (state, action) => {
      state.isEditPost = action.payload.isEdit
    },
  },
})

export const { deletePost, deletePostFailed, deletePostSuccess, editPost, editPostFailed, editPostSuccess, setIsEdit, fetchPostsFailed, fetchPostsSuccess, fetchPosts, publishPost, publishPostFailed, publishPostSuccess } = feedSlice.actions
export default feedSlice.reducer
