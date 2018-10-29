import { GET_PARTY, GET_MEMBERS, GET_MEMBERS_ID, CREATE_PARTY, DELETE_PARTY, UPDATE_PARTY } from '../actions/party';

const initialState =
  {
    "name": '',
    "description": '',
    "members": [],
    "memberNames": [],
    "getPartyName": 'Default name for test' 
  }





function party(state = initialState, { type, payload }) {

  switch (type) {
    case GET_PARTY:
    case CREATE_PARTY:
    case DELETE_PARTY:
    case UPDATE_PARTY:
			return { ...state, partyList: payload };

		case GET_MEMBERS:
			return { ...state, partyMembers: payload };

		case GET_MEMBERS_ID:
			return { ...state, memId: payload };
		default:
			return state;
  }
}

export default party