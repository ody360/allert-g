import profiles from '../models/allergies'
export const GET_ALLERGIES = 'GET_ALLERGIES'
export const ADD_ALLERGIES = 'ADD_ALLERGIES'


export const getAllergies = () => {

  return async (dispatch) => {
    try {
      const payload = await allergies.getAllergies()
      dispatch({
        type: GET_ALLERGIES,
        payload
      })
    } catch (e) { console.log("ALLERGIES ERR: ", e) }
  }
}

export const addAllergies = (body) => {
  return async (dispatch) => {
    try {
      const payload = await allergies.addAllergies(body);
    } catch (e) {
      
    }
  }
}