import { GET_PROFILES } from '../actions/profiles';

const initialState =
{
  "id": 1,
  "first_name": "",
  "last_name": "",
  "email": "",
  "birthdate": "",
  "sex": "m",
  "home_phone": "",
  "cell_phone": "",
  "emergency1": "",
  "emergency2": "",
  "created_at": "",
  "updated_at": "",
  "users_id": 1,
  "allergies_id": 1,
  "medhx": "",
  "medication": ""
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