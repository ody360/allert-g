import { GET_ALLERGIES } from "../actions/allergies"

const initialState =
{
  allergies:[]
}


function allergies(state = initialState, { type, payload }) {

  switch (type) {
		case GET_ALLERGIES:
			return payload;
		// case LOGOUT:
		//    return state;
		default:
			return state;
  }
}

export default allergies