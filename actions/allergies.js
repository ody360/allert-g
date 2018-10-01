import allergies from '../models/allergies'
export const GET_ALLERGIES = 'GET_ALLERGIES'
export const ADD_ALLERGIES = 'ADD_ALLERGIES'
export const CHECK_ALLERGIES = 'CHECK_ALLERGIES'


export const getAllergies = () => {
  return async (dispatch) => {
    try {
      const payload = await allergies.getAllergies()
      
      dispatch({
        type: GET_ALLERGIES,
        payload: payload,
      })
    } catch (e) { console.log("GET ALLERGIES ERR:  ", e) }
  }
}

export const addAllergies = (body) => {
  return async (dispatch) => {
    try {
      await allergies.addAllergies(body)
      const payload = await allergies.getAllergies();
      console.log('PAYLOAD RECEIVED FROM ADD: ', payload)
      dispatch({
        type: ADD_ALLERGIES,
        payload
      })
    } catch (e) {
      console.log("ADD ALLERGY ERR: ", e)
    }
  }
}

export const checkAllergies = (id) => {
  return async (dispatch) => {
    try {
      const payload = await allergies.checkAllergies(id)
      dispatch({
        type: CHECK_ALLERGIES,
        Payload
      })
    } catch (e) {
      console.log("Check Allergy Err", e)
    }
  }
}