import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, View, StyleSheet, Text } from 'react-native'
import { getProfiles } from '../actions/profiles'
//import { Switch } from 'native-base';

const mapStateToProps = ({ profiles, allergies }) => ({ profiles, allergies });
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles }, dispatch);



class Preferences extends React.Component {
  static navigationOptions = {
    title: 'Preferences',
  }

  constructor(props) {
    super(props)
    this.state = {
      switch1Value: false,
      switch2Value: false,
    }
  }
  toggleSwitch1 = (value) => {
    
    let tempState = {...this.state}
    tempState = value
    this.setState(...this.state,tempState)
  }
  toggleSwitch2 = (value) => {
    this.setState({ switch2Value: value })
  }

  render() {
    
    return <View style={styles.container}>
      <Text>Type</Text><Switch
        onValueChange={(switch1Value) => this.setState({ switch1Value })}
        value={this.state.switch1Value}
         />
      <Switch
        onValueChange={(switch2Value) => this.setState({switch2Value})}
        value={this.state.switch2Value} />
    </View>
}
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: 100
    }
  })

export default connect(mapStateToProps, mapDispatchToProps)(Preferences)