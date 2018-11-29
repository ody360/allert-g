import profiles from '../models/profiles'
export const GET_PROFILES = "GET_PROFILES"
export const GET_ALL_PROFILES = 'GET_ALL_PROFILES'
export const UPD_PROFILE = "UPD_PROFILE"
export const UPD_MEDICAL = "UPD_MEDICAL"


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

export const getAllProfiles = () => {
  return async (dispatch) => {
    try {
      const payload = await profiles.getAllProfiles()

      return dispatch({
        type: GET_ALL_PROFILES,
        payload
      })

    } catch (e) {
      console.log("Get All Profiles error: ", e)
    }
  }
}

export const updateProfileAllergies = (body) => {
  return async dispatch => {
    const payload = await profiles.updateProfileAllergies(body)


    dispatch({
      type: UPD_PROFILE,
      payload
    })
  }
}


export const updateProfile = (body) => {
  
  return async dispatch => {
    const payload = await profiles.updateProfile(body)

    dispatch({
      type: UPD_PROFILE,
      payload: payload.data.data
    })
  }
}


export const updateMedical = (body) => {

  return async dispatch => {
    let payload = await profiles.updateMedHx(body)
    console.log('PPP1', payload.data.data)
    let p2 = await profiles.updateMeds(body)
    console.log('PPP2', p2.data.data)

    dispatch({
      type: UPD_PROFILE,
      payload: payload.data.data
    })


  }
}
