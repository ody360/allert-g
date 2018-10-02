import axios from 'axios'
const BASE_URL = 'http://10.5.80.142:5000/api';

const getProfiles = async () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjJ9LCJpYXQiOjE1Mzg0MjUxNjQsImV4cCI6MTU0NzA2NTE2NH0.wM2WduKuK17kOlFKnZ8CErHA23fIZlyXcnsxF9xUiBI';
  try {
    const res = await axios.get(`${BASE_URL}/profiles`, { headers: { authorization: `Bearer ${token}` } });
    console.log("RESPONSE FROM DB:  ", res.data)
    return res.data
  } catch (e) { console.log("IN MODEL ERR: ", e) }
}

const getFullProfiles = async (id) => {
  console.log("IN MODELS with id", id)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOnsiaWQiOjJ9LCJpYXQiOjE1Mzg0MjUxNjQsImV4cCI6MTU0NzA2NTE2NH0.wM2WduKuK17kOlFKnZ8CErHA23fIZlyXcnsxF9xUiBI';
  try {
    const res = await axios.get(`${BASE_URL}/profiles/${id}`, { headers: { authorization: `Bearer ${token}` } });
    console.log("RESPONSE22   nbFROM DB:  ", res)
    return res.data
  } catch (e) { console.log("IN Profiles ERR: ", e) }
}

export default { getProfiles, getFullProfiles }