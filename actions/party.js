import model from '../models/party'
export const GET_PARTY = 'GET_PARTY'
export const GET_MEMBERS = 'GET_MEMBERS'
export const GET_MEMBERS_ID = 'GET_MEMBERS_ID'
export const CREATE_PARTY = 'CREATE_PARTY'
export const DELETE_PARTY = 'DELETE_PARTY'
export const UPDATE_PARTY = 'UPDATE_PARTY'

export const getParty = () => {
  return async (dispatch) => {
    try {
      const payload = await model.getParty()

      dispatch({
        type: GET_PARTY,
        payload: payload
      })
       
    } catch (e) { console.log("GET PARTY ERR:   ", e) }
  }
}

export const getMembers = (partyId) => {
  return async (dispatch) => {
    try{
      const payload = await model.getMembers(partyId);
        
      dispatch({
        type: GET_MEMBERS,
        payload: payload.data,
      })
      dispatch(getMembersId(payload.data))
   
    } catch (e) { console.log('GET MEMBERS ERROR:  ', e)}
  }
}

export const getMembersId = (arr) => {
  let ids = []
  for(let o of arr) {
    ids.push(o.users_id)
  }

  return async (dispatch) => {
    try{
      const payload = await model.getMembersId(ids)
      
      
      dispatch({
        type: GET_MEMBERS_ID,
        payload,
      })
    } catch (e) { console.log('Get Member ID info err: ', e)}
  }
}

export const createParty = (data) => {
  return async (dispatch) => {
  try {
    const payload = await model.createParty(data)

    dispatch({
      type: CREATE_PARTY,
  //    payload,
    })
    dispatch(getParty())

  } catch (e) {
    console.log('CREATE MEMBER ERR', e)
  }
}
 
}

export const deleteParty = (id) => {
  return async (dispatch) => {
    try{
      const payload = await model.deleteParty(id)

      dispatch({
        type: DELETE_PARTY,

      })
      dispatch(getParty())

    } catch (e) {
      console.log('COULD NOT DELETE:  ', e)
    }
  }
}

export const updateParty = (data) => {
  return async (dispatch) => {
    try {
      const payload = await model.updateParty(data.membersArray, data.partyId);

      dispatch({
        type: UPDATE_PARTY,
        //    payload,
      })
      dispatch(getParty())

    } catch (e) {
      console.log('Update ERR', e)
    }
  }

}
