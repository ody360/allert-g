import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { BASE_URL } from '../components/Constants'

const getProfiles = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    while (token.indexOf('"') != -1) {
      token = token.replace('"', '')
    }
    
    const res = await axios.get(`${BASE_URL}/profiles`, { headers: { authorization: `Bearer ${token}` } })
    return res.data
  } catch (e) { console.log("IN MODEL ERR: ", e) }
}

const getAllProfiles = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    
    while(token.indexOf('"') != -1){
      token = token.replace('"', '')
    }
    let authorization = `Bearer ${token}`
    const res = await axios.get(`${BASE_URL}/profiles/all`, { headers: { authorization } })
    
    return res.data.data
  } catch (e) { 
    console.log("IN Profiles ERR:  ", e)   
   }
}




export default { getProfiles, getAllProfiles };