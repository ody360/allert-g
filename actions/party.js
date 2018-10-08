import model from '../models/party'
export const GET_PARTY = 'GET_PARTY'
export const GET_MEMBERS = 'GET_MEMBERS'


export const getParty = () => {
  return async (dispatch) => {
    try {
      const payload = await model.getParty()

      console.log('IN GET PARTY AND SENDING THE FOLLOWING INFO!!!!!!!!!!!!!!!! !!!!!', payload)

      dispatch({
        type: GET_PARTY,
        payload,
      })
    } catch (e) { console.log("GET PARTY ERR:  ", e) }
  }
}

export const getMembers = () => {
  return async (dispatch) => {
    try{
      const payload = await model.getMembers()
      console.log('THIS IS NOW FOR GET MEMBERS:  WHAT DO WE GET?!!!!!! !!!!!', payload)
      dispatch({
        type: GET_MEMBERS,
        payload,
      })
    } catch (e) { console.log('GET MEMBERS ERROR: ', e)}
  }
}
