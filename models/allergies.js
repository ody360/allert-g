import axios from 'axios'
import {BASE_URL} from '../components/Constants'
//const BASE_URL = 'http://10.5.80.142:5000/api'

const getAllergies = async () => {
	//console.log('IN ACTION GET ALLERGIES: ')

	console.log('BASEURL IS CURRENTLY:  ', BASE_URL)
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


export default { getAllergies, addAllergies };
