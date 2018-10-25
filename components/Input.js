import React from 'react'
import { TextInput, View, Text } from 'react-native'

const Input = ({ label }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput 
        style={{height: 20, width: 100}}      
      />
    </View>
  )

}

export { Input }

checkLoading = () => {
  let listArray = []
  setTimeout(() => {
    this.props.profiles.allProfiles.map((m, i) => {
      listArray.push({ name: `${m.first_name} ${m.last_name}`, key: i })
    }
    )
    this.setState({
      listViewData: listArray
    })
  }, 1000)
}