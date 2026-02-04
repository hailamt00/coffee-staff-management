import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Admin, AuthState }  from '@/shared/types/api' 

const initialState: AuthState = {
  admin: null,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  isAuthenticated: !!localStorage.getItem('token'),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(
      state,
      action: PayloadAction<{
        admin: Admin
        token: string
        refreshToken: string
      }>
    ) {
      state.admin = action.payload.admin
      state.token = action.payload.token
      state.refreshToken = action.payload.refreshToken
      state.isAuthenticated = true

      localStorage.setItem('token', action.payload.token)
      localStorage.setItem(
        'refreshToken',
        action.payload.refreshToken
      )
    },

    logout(state) {
      state.admin = null
      state.token = null
      state.refreshToken = null
      state.isAuthenticated = false
      localStorage.clear()
    },
  },
})

export const { loginSuccess, logout } =
  authSlice.actions
export default authSlice.reducer
