import React from 'react'
import { CheckBox } from 'react-native-elements';

const Allergies = ({ allergies, checked, onPress }) => {
  let allergyArray = []
  allergies.forEach((allergy, i) => {
    console.log('Allergy: ', allergy)
    allergyArray.push(<CheckBox key={i} title={allergy} checked={checked} onPress={() => onPress()} />)
  })

  return (allergyArray)
}

export default Allergies