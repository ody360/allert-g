import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Avatar, Divider, FormInput, FormLabel, FormValidation } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import { Content, ListItem, Radio, Right, Left, Button } from 'native-base'

export default class NewUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      birthdate: '',
      sex: '',
      home_phone: '',
      cell_phone: '',
      emergency1: '',
      emergency2: '',

    }
  }

  render() {
    return (
    <View style={styles.container}>
      <View style={styles.navbar}>
				<Text style={styles.titleText}>NEW USER SIGN-UP</Text>
			</View>
			<ScrollView 
        contentContainerStyle={{paddingTop: 25}}
        style={{ flex: 1, backgroundColor:'#f8f8f9' }}>
          <Avatar
            medium
            rounded
            source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg" }}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
          <FormLabel>Name</FormLabel>
          <FormInput placeholder="First Name"/>
          <FormInput placeholder="Last Name"/>

          <FormLabel>Email</FormLabel>
          <FormInput placeholder="user@test.com" />
          <FormLabel>Password</FormLabel>
          <FormInput placeholder="Last Name" />
          <FormLabel>Confirm Password</FormLabel>
          <FormInput placeholder="Last Name" />


          <DatePicker
            style={{ width: 200 }}
            date={this.state.birthdate}
            androidMode="spinner"
            placeholder="select date"
            format="MM-DD-YYYY"
            minDate="1900-05-01"
            maxDate="2018-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys.
            }}
            onDateChange={(date) => {this.setState({birthdate: date})}}
          />
          <Content>
          <ListItem>
            <Left>
              <Text>Male</Text>
            </Left>
            <Right>
              <Radio selected={false} />
            </Right>
              <Left>
                <Text>Female</Text>
              </Left>
              <Right>
                <Radio selected={true} />
              </Right>
          </ListItem>
          </Content>

          <Button full info>
            <Text>Continue</Text>
          </Button>
        
			
			</ScrollView>
			
    </View>
    )
  }
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	navbar: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 65,
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop:10,
	},
	titleText: {
		fontSize: 15,
    color: '#fff',
    
	},
});