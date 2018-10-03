import auth from '../models/auth'
import profiles from '../models/profiles'
import { AsyncStorage } from 'react-native'
export const LOGIN = 'LOGIN'
//export const LOGOUT = 'LOGOUT'


export const login = ({email, password}) => {
  return async dispatch => {
    try {
      const payload = await auth.login(email,password)
      await AsyncStorage.setItem("token", JSON.stringify(payload))
      payload = {...payload, isLoggedIn: true}
      
      
      dispatch({
        type: LOGIN,
        payload
      })
    } catch(e) {
      console.log("ERROR ", e)
    }
  }
}

