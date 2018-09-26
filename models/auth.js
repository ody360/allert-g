import axios from 'axios'
const BASE_URL = 'http://10.5.80.142:5000/api/users/login';

const login = async (email,password) => {
  console.log("IN MODELS", email, password)
  const body = {
    email,
    password
  }
  console.log("BODY LOOKS LIKE: ", body)
  try {
    const res = await axios.post(BASE_URL,body)
    console.log("RESPONSE FROM DB: ", res)
    return res.data
  } catch(e) { console.log("IN MODEL ERR: ", e)}
}

export default { login }