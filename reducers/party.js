import { GET_PARTY, GET_MEMBERS  } from '../actions/party';

const initialState = [
  {
    "id": 1
    "name": ''
    "description": '',

  },
  {
    members: [
      {
        "users_id": 1
      }
    ]
  }

]



function profiles(state = initialState, { type, payload }) {

  switch (type) {
    case GET_PARTY:
      return payload;

    case GET_MEMBERS:
      return payload;

    default:
      return state;
  }
}

export default profiles