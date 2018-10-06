import { LOGIN, SIGNUP, LOGOUT } from "../actions/auth"

const initialState = 
  { 
    email: '',
    password: '',
    isLoggedIn: false
 }


 function auth (state = initialState, {type,payload}) {
  
  switch (type) {
    case LOGIN:
    case SIGNUP:
      return payload;
    
    default:
      return state;

  }
}

export default auth