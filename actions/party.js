import model from '../models/party'
export const GET_PARTY = 'GET_PARTY'
export const GET_MEMBERS = 'GET_MEMBERS'
export const GET_MEMBERS_ID = 'GET_MEMBERS_ID'

export const getParty = () => {
  return async (dispatch) => {
    try {
      const payload = await model.getParty()
      dispatch({
        type: GET_PARTY,
        payload: payload[0].name, 
      })
       console.log('*****')
       dispatch(getMembers())
    } catch (e) { console.log("GET PARTY ERR:   ", e) }
  }
}

export const getMembers = () => {
  return async (dispatch) => {
    try{
      let arr = []
      const payload = await model.getMembers()
    
      
      dispatch({
        type: GET_MEMBERS,
         payload: payload.data,
      })
      // for(let i = 0; i< payload.data.length; i++) {
      //   dispatch(getMembersId(payload.data[i].users_id))
      // }
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
