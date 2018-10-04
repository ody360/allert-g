import axios from 'axios'
import { AsyncStorage } from 'react-native'
import { BASE_URL } from '../components/Constants'

const getProfiles = async () => {
  //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjJ9LCJpYXQiOjE1Mzg0MjUxNjQsImV4cCI6MTU0NzA2NTE2NH0.wM2WduKuK17kOlFKnZ8CErHA23fIZlyXcnsxF9xUiBI';
  try {
    const res = await axios.get(`${BASE_URL}/profiles`, { headers: { authorization: `Bearer ${token}` } });
   // console.log("RESPONSE FROM DB:  ", res.data)
    return res.data
  } catch (e) { console.log("IN MODEL ERR: ", e) }
}

const getFullProfiles = async () => {
 // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjF9LCJpYXQiOjE1Mzg1NTA1MTIsImV4cCI6MTU0NzE5MDUxMn0.pJcDMtJJNHr_-_ffYNUmKv5jveBPawHaAIALYkDBU1g'
  const token = await AsyncStorage.getItem('token')
  try {
    //const token = await AsyncStorage.getItem('token')
    console.log('CURRENT TOKEN IS:   ', token)
    const res = await axios.get(`${BASE_URL}/profiles`, { headers: { authorization: `Bearer ${token}` } });
    
    return res.data
  } catch (e) { 
    console.log("IN Profiles ERR:  ", e)
    AsyncStorage.clear()
   
    
   }
}

export default { getProfiles, getFullProfiles }