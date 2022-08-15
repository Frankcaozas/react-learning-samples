import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'

export const authApi = createApi({
  reducerPath:'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api'
  }),
  endpoints(build){
    return{
      register: build.mutation({
        query(user){
          return {
            method:'post',
            body: user,
            url: '/auth/local/register'
          }
        }
      }),
      login: build.mutation({
        query(identifier){
          return {
            method:'post',
            body: identifier,
            url: '/auth/local'
          }
        }
      })
    }
  }
})

export const {
  useRegisterMutation,
  useLoginMutation,
} = authApi
