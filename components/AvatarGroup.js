import React from 'react';
import { ActivityIndicator } from 'react-native'
import { Avatar } from 'react-native-elements'

const AvatarGroup = (group) => {
  let groupArray = []

  group.group.length === undefined ? <ActivityIndicator /> : 
    group.group.forEach((g, i) => {
      groupArray.push(
          <Avatar  
              key={i} 
              title={g.name} 
              rounded 
              //source={require("../assets/images/avatar-group1.png")} 
              onPress={() => group.onPress(g.id)} 
          />)
    })

    return groupArray
  
  }
  
    
export default AvatarGroup