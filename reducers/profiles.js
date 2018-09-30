import { } from "../actions/profiles"

const initialState =
{
  "id":,
  "first_name":'',
  "last_name": '',
  "email": '',
  "birthdate": '',
  "sex": '',
  "home_phone": '',
  "cell_phone": '',
  "emergency1": '',
  "emergency2": '',
}


function profiles(state = initialState, { type, payload }) {

  switch (type) {
    case GET_PROFILES:
      return payload;

    default:
      return state;
  }
}

export default profiles