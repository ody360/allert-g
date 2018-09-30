import axios from 'axios'
const BASE_URL = 'http://10.5.80.142:5000/api/';

const getProfiles = async () => {
  console.log("IN MODELS", email, password)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjJ9LCJpYXQiOjE1Mzc5OTU4MDEsImV4cCI6MTU0NjYzNTgwMX0.4lQtUq1WbxGKlg26t-e4pdztclLY05c9E9eZmOK8QVU';
  try {
    const res = axios.get(`${BASE_URL}/profiles`, { headers: { authorization: `Bearer ${token}` } });
    console.log("RESPONSE FROM DB: ", res)
    return res.data
  } catch (e) { console.log("IN MODEL ERR: ", e) }
}

export default { getProfiles }