import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/reducer/authSlice"

export const useAutoLogout = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    const expirationTime = auth.expirationTime
    const time = expirationTime -Date.now() 
    if (time < 0) {
      dispatch(logout())
      return
    }
    const timer = setTimeout(() => {
      console.log('clear')
      dispatch(logout())
    }, time);

    return () => clearTimeout(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth])
}