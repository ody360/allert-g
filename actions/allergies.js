import model from '../models/allergies'
export const GET_ALLERGIES = 'GET_ALLERGIES'
export const ADD_ALLERGIES = 'ADD_ALLERGIES'
export const CHECK_ALLERGIES = 'CHECK_ALLERGIES'
export const GET_ALLERGY_NAME = 'GET_ALLERGY_NAME'


export const getAllergies = () => {
  return async (dispatch) => {
    try {
      const payload = await model.getAllergies();
      
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
      await model.addAllergies(body);
      const payload = await model.getAllergies();
  
      dispatch({
        type: ADD_ALLERGIES,
        payload
      })
    } catch (e) {
      console.log("ADD ALLERGY ERR: ", e)
    }
  }
}

export const checkAllergies = () => {
  return async (dispatch) => {
    try {
      const payload = await model.checkAllergies();
      dispatch({
        type: CHECK_ALLERGIES,
        payload
      })
    } catch (e) {
      console.log("Check Allergy Err", e)
    }
  }
}

export const getOneAllergy = (id) => {
  return async (dispatch) => {
    try {
      
      const payload = await model.getOneAllergy(id);
      dispatch({
        type: GET_ALLERGY_NAME,
        payload: payload.data[0]
    })
  } catch (e) {
      console.log("Get Allergy Name Error: ", e)
    }
  }
}