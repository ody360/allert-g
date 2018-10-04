import axios from 'axios'
import {AsyncStorage} from 'react-native'
import { BASE_URL } from '../components/Constants'

const login = async (email,password) => {
  const body = {
    email,
    password
  }

  try {
    const res = await axios.post(`${BASE_URL}/users/login`,body)
   // console.log('IN LOGIN WITH RESPONSE:  ', res)
    return res.data
  } catch(e) { console.log("Could Not Log In: ", e)}
}

export default { login }