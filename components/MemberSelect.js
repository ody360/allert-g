import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import styles from '../styles/styles';



const MemberSelect = ({group,onPress}) => {
  let groupArray = [];
  group.forEach((g, i) => {
    groupArray.push(
      <Text key={g + i} style={styles.navItemStyle} onPress={() => {onPress(g.pid, g.name)}}>
        {g.name}
      </Text>)

  })

  return groupArray
}

export default MemberSelect