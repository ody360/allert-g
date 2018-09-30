import axios from 'axios'
import {AsyncStorage} from 'react-native'
const BASE_URL = 'http://10.5.80.142:5000/api/users/';

const login = async (email,password) => {
  const body = {
    email,
    password
  }

  try {
    const res = await axios.post(`${BASE_URL}/login`,body)
    return res.data
  } catch(e) { console.log("IN MODEL ERR: ", e)}
}

export default { login }