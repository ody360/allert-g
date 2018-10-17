import profiles from '../models/profiles'
export const GET_PROFILES = "GET_PROFILES"
export const GET_PROFILES_ID = "GET_PROFILES_ID"
export const UPD_PROFILE = "UPD_PROFILE"


export const getProfiles = () => {

  return async (dispatch) => {
    try {
      const payload = await profiles.getProfiles()
    
      return dispatch({
        type: GET_PROFILES,
        payload
      })
    } catch(e) { console.log("PROFILE ERR: ", e)}
  }
}

export const getProfilesId = () => {

  return async (dispatch) => {
    try {
      const payload = await profiles.getFullProfiles();

      console.log('PROFILES CHECK!', payload)
      return dispatch({
        type: GET_PROFILES_ID,
        payload
      })
    } catch (e) { console.log("PROFILE ERR: ", e) }
  }
}

export const updateProfile = (body) => {
  
  return dispatch => {
    const payload = {...body}

    dispatch({
      type: UPD_PROFILE,
      payload
    })
  }
}
