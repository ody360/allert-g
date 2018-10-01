import { LOGIN, LOGOUT } from "../actions/auth"

const initialState = 
  { 
    email: '',
    password: '',
    isLoggedIn: false
 }


 function auth (state = initialState, {type,payload}) {
  
  switch (type) {
    case LOGIN:
      return {...state, token: payload, isLoggedIn: true};
    
    default:
      return state;

  }
}

export default auth