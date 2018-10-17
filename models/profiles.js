import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { BASE_URL } from '../components/Constants'

const getProfiles = async () => {
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjJ9LCJpYXQiOjE1Mzg0MjUxNjQsImV4cCI6MTU0NzA2NTE2NH0.wM2WduKuK17kOlFKnZ8CErHA23fIZlyXcnsxF9xUiBI';
  try {
    const token = await AsyncStorage.getItem('token')
    
    const res = await axios.get(`${BASE_URL}/profiles`, { headers: { authorization: `Bearer ${token}` } })
    return res.data
  } catch (e) { console.log("IN MODEL ERR: ", e) }
}

const getFullProfiles = async () => {
  try {
    const token = await AsyncStorage.getItem('token')
    
    while(token.indexOf('"') != -1){
      token = token.replace('"', '')
    }
    let authorization = `Bearer ${token}`
    const res = await axios.get(`${BASE_URL}/profiles`, { headers: { authorization } })
    
    return res.data
  } catch (e) { 
    console.log("IN Profiles ERR:  ", e)   
   }
}




export default { getProfiles, getFullProfiles };