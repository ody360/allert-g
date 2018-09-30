import { LOGIN, LOGOUT } from "../actions/auth"

const initialState = 
  { 
    email: '',
    password: '',
    token: '',
    isLoggedIn: false
 }


 function auth (state = initialState, {type,payload}) {
  
  switch (type) {
    case LOGIN:
      return {...state, token: payload};
    // case LOGOUT:
    //    return state;
    default:
      return state;

  }
}

export default auth