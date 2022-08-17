import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: "auth",
  initialState: () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return ({
        token: null,
        isLogin: false,
        user: null,
        experirationTime: 0
      })
    }

    return ({
      token: token,
      isLogin: true,
      user: JSON.parse(localStorage.getItem('user')),
      experirationTime: +localStorage.getItem('experirationTime')
    })

  },
  reducers: {
    storeAuth: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.isLogin = true
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
      const curTime = Date.now()
      const timeout = 10000
      state.expirationTime = curTime + timeout
      localStorage.setItem('expirationTime',state.expirationTime + '')
    },
    logout: (state, action) => {
      state.token = null
      state.user = null
      state.isLogin = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('expirationTime')
    }
  }
})
export const {
  storeAuth,
  logout
} = authSlice.actions