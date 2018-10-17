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
    return res.data
  } catch(e) { console.log("Could Not Log In: ", e)}
}

const signup = async body => {
	try {
    const res = await axios.post(`${BASE_URL}/users/signup`, body)
    return res.data
	} catch (e) {
		console.log('Models: Could not create user: ', e);
	}
};
export default { login, signup }