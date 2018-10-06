import React from 'react'
import { ActivityIndicator } from 'react-native'
import { CheckBox } from 'react-native-elements';

const Allergies = (allergies) => {
  //console.log('ALLERT', allergies)
  console.log('ALLERGIES:   ', allergies)
  let allergyArray = [];
  (allergies.allergies[0] === undefined ? <ActivityIndicator /> :
  allergies.allergies.forEach((a, i) => {
    allergyArray.push(<CheckBox key={i} title={a.allergy_name} checked={a.checked} onPress={()=> allergies.onPress(a.id)} />)
  })
  )

	return allergyArray;
}

export default Allergies