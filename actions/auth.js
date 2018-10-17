import auth from '../models/auth'
import profiles from '../models/profiles'
import { AsyncStorage } from 'react-native'
export const LOGIN = 'LOGIN'
export const SIGNUP = 'SIGNUP'
//export const LOGOUT = 'LOGOUT'


export const login = ({email, password}) => {
  return async dispatch => {
    try {
      const payload = await auth.login(email,password)
      await AsyncStorage.setItem("token", JSON.stringify(payload.token))
      payload = {...payload, isLoggedIn: true}
      
      return dispatch({
        type: LOGIN,
        payload
      })
    } catch(e) {
      console.log("Log in error: ", e)
    }
  }
}


export const signup = (body) => {
  return async dispatch => {
	  try {
      const payload = await auth.signup(body)
      await AsyncStorage.setItem('token', JSON.stringify(payload.token))
      payload = {...payload, isLoggedIn: true }

		  return dispatch({
			  type: SIGNUP,
			  payload,
		  })
	  } catch (e) {
		  console.log('Could not create user: ', e)
    }
  }
}