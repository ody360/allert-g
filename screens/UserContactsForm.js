import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import { Avatar, Divider, FormInput, FormLabel, FormValidation } from 'react-native-elements'
import { Content, ListItem, Radio, Right, Left, Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { updateProfile } from '../actions/profiles'

var moment = require('moment')

const mapStateToProps = ({ profiles }) => ({ profiles })
const mapDispatchToProps = dispatch => bindActionCreators({ updateProfile }, dispatch)


class UserContactsForm extends React.Component {
  constructor(props) {
    super(props)
    const testState = this.props.navigation.getParam('state')
    this.state = {
      ...testState,
      home_phone: '',
      cell_phone: '',
      emergency1: '',
      emergency2: ''
    }

  }


  render() {
    // return <KeyboardAwareScrollView style={{ backgroundColor: '#4c69a5' }}
    //   resetScrollToCoords={{ x: 0, y: 0 }}
    //   contentContainerStyle={styles.container}
    //   scrollEnabled={false}
    //   enableOnAndroid={true} >
      

      return <ScrollView contentContainerStyle={{ paddingTop: 30 }} style={{ flex: 1, backgroundColor: '#f8f8f9' }}
        keyboardDismissMode="interactive"
        overScrollMode='always'>

        <Avatar medium rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }} onPress={() => console.log('Works!')} activeOpacity={0.7} />
       <Content>
        <FormLabel>Home Phone</FormLabel>
        <FormInput textInputRef="home_phone" placeholder="2065551212" onChangeText={(text) => this.setState({ home_phone: text })} />
        <FormLabel>Cell Phone</FormLabel>
        <FormInput textInputRef="cell_phone" placeholder="2065551212" onChangeText={(text) => this.setState({ cell_phone: text })} />
        <FormLabel>Emergency Number 1</FormLabel>
        <FormInput textInputRef="emergency1" placeholder="2065551212" onChangeText={(text) => this.setState({ emergency1: text })} />
        <FormLabel>Emergency Number 2</FormLabel>
        <FormInput textInputRef="emergency2" placeholder="2065551212" onChangeText={(text) => this.setState({ emergency2: text })} />
        </Content>

       
        <Button full info onPress={() => {
          ///this.props.updateProfile(...this.state)
          this.props.navigation.navigate('Allergy', {'state': this.state})
        }}>
          <Text>Continue</Text>
        </Button>
      

      </ScrollView>
  //  </KeyboardAwareScrollView>
  }
}


const styles = StyleSheet.create({
  container: {
    //flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    

  },
  navbar: {
    //position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: 'purple',
    justifyContent: 'center',
    //alignItems: 'center',
    paddingTop: 10,
  },
  titleText: {
    fontSize: 15,
    color: '#fff',

  },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserContactsForm)