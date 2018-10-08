import axios from 'axios'
import {BASE_URL} from '../components/Constants'
import { AsyncStorage } from 'react-native'

const getAllergies = async () => {
	//console.log('IN ACTION GET ALLERGIES: ')

	try {
		const res = await axios.get(`${BASE_URL}/allergies`)
		return res.data.data
	} catch (e) {
		console.log('IN MODEL ERR: ', e)
	}
}

const addAllergies = async (name) => {
	try {
		const res = axios.post(`${BASE_URL}/allergies`,name)
		return res.data
	} catch (e) {console.log('Could not post allergy: ', e)}
}

const checkAllergies = async () => {
	try {
		const token = await AsyncStorage.getItem('token')
		while (token.indexOf('"') != -1) {
			token = token.replace('"', '')
		}
		let authorization = `Bearer ${token}`
		const res = await axios.get(`${BASE_URL}/profiles/allergies`, { headers: { authorization } })

		return res.data
	} catch (e) {
		console.log('Could not load user alleregies' , e)
	}
}

const getOneAllergy = async (id) => {
	try {
		const res = await axios.get(`${BASE_URL}/allergies/${id}`)
		return res.data 
	} catch (e) {
		console.log('Could no retrieve allergy name', e)
	}
}


export default { getAllergies, addAllergies, checkAllergies, getOneAllergy }
