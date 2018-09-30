import axios from 'axios'
const BASE_URL = 'http://10.5.80.142:5000/api/'

const getProfiles = async () => {
	try {
		const res = axios.get(`${BASE_URL}/allergies`)
		console.log('RESPONSE FROM DB: ', res)
		return res.data
	} catch (e) {
		console.log('IN MODEL ERR: ', e)
	}
}

export default { getProfiles }
