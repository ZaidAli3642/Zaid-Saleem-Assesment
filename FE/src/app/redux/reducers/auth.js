import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: {},
    error: null,
    loading: false,
    token: null,
  },
  reducers: {
    login: (state, action) => {
      ;(state.loading = true), (state.error = null)
    },
    register: (state, action) => {
      state.loading = true
      state.error = null
    },
    success: (state, action) => {
      const { userInfo, token } = action.payload
      state.loading = false
      state.error = null
      state.userInfo = userInfo
      state.token = token
    },
    failed: (state, action) => {
      state.loading = false
      state.error = action.payload.error
      state.userInfo = {}
      state.token = null
    },
    logout: (state, action) => {
      state.userInfo = {}
      state.token = null
    },
  },
})

export const { failed, login, logout, register, success } = authSlice.actions
export default authSlice.reducer
