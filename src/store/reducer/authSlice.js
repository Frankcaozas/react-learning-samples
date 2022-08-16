import { createSlice } from "@reduxjs/toolkit";


export  const authSlice = createSlice({
  name:"auth",
  initialState: {
    token: null,
    isLogin: false,
    user:null
  },
  reducers:{
    storeAuth: (state,action)=>{
      state.token = action.payload.token
      state.user = action.payload.user
      state.isLogin = true
    },
    logout:(state, action)=>{
      state.token = null
      state.user = null
      state.isLogin = false
    }
  }
})
export const{
  storeAuth,
  logout
} = authSlice.actions