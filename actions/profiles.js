import profiles from '../models/profiles'
export const GET_PROFILES = "GET_PROFILES"
export const GET_PROFILES_ID = "GET_PROFILES_ID"
export const ADD_PROFILE = "ADD_PROFILE"


export const getProfiles = () => {

  return async (dispatch) => {
    try {
      const payload = await profiles.getProfiles()
    //  console.log('GETTING PAYLOAD:  ', payload)
      dispatch({
        type: GET_PROFILES,
        payload
      })
    } catch(e) { console.log("PROFILE ERR: ", e)}
  }
}

export const getProfilesId = (id) => {

  return async (dispatch) => {
    try {
      const payload = await profiles.getFullProfiles(id);
      dispatch({
        type: GET_PROFILES_ID,
        payload
      })
    } catch (e) { console.log("PROFILE ERR: ", e) }
  }
}