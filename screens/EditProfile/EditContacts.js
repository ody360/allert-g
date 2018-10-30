import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native'
import { Avatar, Divider, FormInput, FormLabel, FormValidation } from 'react-native-elements'
import { Content, ListItem, Radio, Right, Left, Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getProfiles, updateProfile } from '../../actions/profiles';

var moment = require('moment')

const mapStateToProps = ({ profiles }) => ({ profiles })
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles, updateProfile }, dispatch);


class EditContacts extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      home: '',
      cell: '',
      emerg1: '',
      emerg2: ''
    }

  }

  async componentDidMount() {
    await this.props.getProfiles()
    const home = this.props.profiles.data[0].home_phone
    const cell = this.props.profiles.data[0].cell_phone
    const emerg1 = this.props.profiles.data[0].emergency1
    const emerg2 = this.props.profiles.data[0].emergency2
    this.setState({home, cell, emerg1, emerg2})
  }


  render() {
      return <ScrollView contentContainerStyle={{ paddingTop: 30 }} style={{ flex: 1, backgroundColor: '#f8f8f9' }}
        keyboardDismissMode="interactive"
        overScrollMode='always'>

        <Avatar medium rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }} onPress={() => console.log('Works!')} activeOpacity={0.7} />
       <Content>
        <FormLabel>Home Phone</FormLabel>
        <FormInput textInputRef="home_phone" value={this.state.home} onChangeText={(text) => this.setState({ home: text })} />
        <FormLabel>Cell Phone</FormLabel>
        <FormInput textInputRef="cell_phone" value={this.state.cell} onChangeText={(text) => this.setState({ cell: text })} />
        <FormLabel>Emergency Number 1</FormLabel>
        <FormInput textInputRef="emergency1" value={this.state.emerg1} onChangeText={(text) => this.setState({ emerg1: text })} />
        <FormLabel>Emergency Number 2</FormLabel>
        <FormInput textInputRef="emergency2" value={this.state.emerg2} onChangeText={(text) => this.setState({ emerg2: text })} />
        </Content>

       
        <Button full info onPress={() => {
          console.log('PRESSED TO SUBMIT', this.state)
          this.props.updateProfile(this.state)
        }}>
          <Text>Update</Text>
        </Button>
      

      </ScrollView>
 
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

export default connect(mapStateToProps, mapDispatchToProps)(EditContacts)