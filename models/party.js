import axios from 'axios'
import { BASE_URL } from '../components/Constants'
import { AsyncStorage } from 'react-native'

const getParty = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/party`)
    return res.data.data
  } catch (e) {
    console.log('IN MODEL ERR: ', e)
  }
}

const getMembers = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/allergies/all`)
    return res.data.data
  } catch (e) {
    console.log('Could no retrieve allergy name', e)
  }
}



export default { getParty, getMembers }
