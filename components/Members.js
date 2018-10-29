import React from 'react'
import { ActivityIndicator } from 'react-native'
import { CheckBox } from 'react-native-elements';

const Members = (members) => {
  let membersArray = []

  (members.members === undefined ? <ActivityIndicator /> : 
    members.members.allProfiles.forEach((m, i) => {
      membersArray.push(<CheckBox  />)
  })
  )

  return membersArray;
}

export default Members