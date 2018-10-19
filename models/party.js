import axios from 'axios'
import { BASE_URL } from '../components/Constants'
import { AsyncStorage } from 'react-native'

const getParty = async () => {
  try {
     const token = await AsyncStorage.getItem('token')
    
    while(token.indexOf('"') != -1){
      token = token.replace('"', '')
    }
    let authorization = `Bearer ${token}`
    const res = await axios.get(`${BASE_URL}/party`, { headers: { authorization } })
    
    return res.data.data
  } catch (e) {
    console.log('Model get party error: ', e)
  }
}

const getMembers = async (id) => {
  try {
    const token = await AsyncStorage.getItem('token')

    while (token.indexOf('"') != -1) {
      token = token.replace('"', '')
    }
    let authorization = `Bearer ${token}`
    const res = await axios.get(`${BASE_URL}/party/all/${id}`, { headers: { authorization } })

    console.log('GET MEMBERS MODEL RETURNS **** ', res.data)
    return res.data
  } catch (e) {
    console.log('Could not retrieve allergy name', e)
  }
}

const getMembersId = async (arr) => {
  try {
    let result = []
    const token = await AsyncStorage.getItem('token')

    while (token.indexOf('"') != -1) {
      token = token.replace('"', '')
    }
    let authorization = `Bearer ${token}`
    for(let id of arr) {
      const user = await axios.get(`${BASE_URL}/party/${id}`)
      if(user !== undefined) result.push(user.data.data)
    }
    return result

  } catch (e) {
    console.log('Could not get member info', e)
  }
}



export default { getParty, getMembers, getMembersId }
