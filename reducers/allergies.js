import { GET_ALLERGIES, ADD_ALLERGIES, CHECK_ALLERGIES } from '../actions/allergies';

const initialState =
{
	id:'',
	allergy_name:'',
	checked: false,
}


function allergies (state = initialState, { type, payload }) {

  switch (type) {
		case GET_ALLERGIES:
		case ADD_ALLERGIES:
		case CHECK_ALLERGIES:
			return payload;
		default:
			return state;
  }
}

export default allergies