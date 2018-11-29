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
    ("IN Profiles ERR:  ", e)   
   }
}

const updateProfileAllergies = async (body) => {
  try{
    const token = await AsyncStorage.getItem('token')

    while (token.indexOf('"') != -1) {
      token = token.replace('"', '')
    }
    let Authorization = `Bearer ${token}`
    // const res = await axios.put(`${BASE_URL}/profiles/allergies`, { headers: { authorization }}, body)
    // return res.data
    return axios({
		method: 'put',
		url: `${BASE_URL}/profiles/allergies`,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			Authorization,
		},
		data: body
	});

  } catch (e) {
    ('Update allergy err: ', e)
  } 
} 

const updateProfile = async (body) => {
  try {
    const data = {home_phone: body.home, cell_phone: body.cell, emergency1: body.emerg1, emergency2: body.emerg2}
    const token = await AsyncStorage.getItem('token')
    while (token.indexOf('"') != -1) {
      token = token.replace('"', '')
    }
    return axios({
      method: 'put',
      url: `${BASE_URL}/profiles`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data
    })
 //   return res.data
  } catch (e) { ("IN MODEL ERR: ", e) }
}

const updateMedHx = async (body) => {
  try {
    const data = { medhx: body.medhx }
    const token = await AsyncStorage.getItem('token')
    while (token.indexOf('"') != -1) {
      token = token.replace('"', '')
    }
    return axios({
      method: 'put',
      url: `${BASE_URL}/profiles/medhx`,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      data
    })
    //   return res.data
  } catch (e) { ("IN MODEL ERR: ", e) }
}

const updateMeds = async body => {
	try {
		const data = { medication: body.medication };
		const token = await AsyncStorage.getItem('token');
		while (token.indexOf('"') != -1) {
			token = token.replace('"', '');
		}
		return axios({
			method: 'put',
			url: `${BASE_URL}/profiles/meds`,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`,
			},
			data,
		});
		//   return res.data
	} catch (e) {
		'IN MODEL ERR: ', e;
	}
};
 


export default { getProfiles, getAllProfiles, updateProfileAllergies, updateProfile, updateMedHx, updateMeds };