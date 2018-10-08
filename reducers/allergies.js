import { GET_ALLERGIES, ADD_ALLERGIES, CHECK_ALLERGIES, GET_ALLERGY_NAME } from '../actions/allergies';

const initialState =
{
	id:'',
	allergy_name:'',
	checked: false,
	name: {},
}


function allergies (state = initialState, { type, payload }) {

  switch (type) {
		case GET_ALLERGIES:
		case ADD_ALLERGIES:
		case CHECK_ALLERGIES:
			return payload;
		case GET_ALLERGY_NAME:
		 return {name: payload.allergy_name};
		default:
			return state;
  } 
}

export default allergies