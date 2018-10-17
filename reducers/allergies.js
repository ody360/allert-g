import { GET_ALLERGIES, ADD_ALLERGIES, CHECK_ALLERGIES, GET_ALLERGY_NAME } from '../actions/allergies';

const initialState =
{
	checked: false,
}


function allergies (state = initialState, { type, payload }) {
  switch (type) {
		case GET_ALLERGIES:
		case ADD_ALLERGIES:
			return {...state, payload}
		case CHECK_ALLERGIES:
			return {...state, userAllergies: payload}
			
		case GET_ALLERGY_NAME:
		 return {...state, name: payload.allergy_name}
		default:
			return state;
  } 
}

export default allergies