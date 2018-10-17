import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { Avatar, Divider, FormInput, FormLabel, FormValidation } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Content, ListItem, Radio, Right, Left, Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { updateProfile } from '../actions/profiles';
var moment = require('moment')


const mapStateToProps = ({ profiles }) => ({ profiles });
const mapDispatchToProps = dispatch => bindActionCreators({ updateProfile }, dispatch);



class NewUserForm extends React.Component {
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

			
		return	<ScrollView contentContainerStyle={{ paddingTop: 30 }} style={{ flex: 1, backgroundColor: '#f8f8f9' }} 
        keyboardDismissMode="interactive"
        overScrollMode='always'>
				
					<Avatar medium rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }} onPress={() => console.log('Works!')} activeOpacity={0.7} />
					<FormLabel>Name</FormLabel>
				<FormInput textInputRef="first_name" placeholder="First Name"  onChangeText={(text) => this.setState({ first_name: text })} />
					<FormInput placeholder="Last Name" onChangeText={(text) => this.setState({ last_name: text })} />

					<FormLabel>Email</FormLabel>
					<FormInput placeholder="user@test.com" onChangeText={(text) => this.setState({ email: text })}/>
					<FormLabel>Password</FormLabel>
					<FormInput placeholder="Password" secureTextEntry={true} onChangeText={(text) => this.setState({ password: text })}/>
					<FormLabel>Confirm Password</FormLabel>
					<FormInput secureTextEntry={true} placeholder="Confirm Password" />

					<DatePicker style={{ width: 200 }} date={this.state.birthdate} androidMode="spinner" placeholder="select date" format="YYYY-DD-MM" minDate="1900-05-01" maxDate="2018-06-01" confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{ dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: { marginLeft: 36 } }
							// ... You can check the source to find the other keys.
						} onDateChange={date => {
							this.setState({ birthdate: date });
						}} />
					<Content>
						<RadioForm
							radio_props={radio_props}
							initial={null}
							onPress={(value) => { this.setState({ sex: value }) }}
						/>
					</Content>

					<Button full info onPress={() => {
							//this.props.updateProfile(this.state)
							this.props.navigation.navigate('Contacts', {'state':this.state})  }}>
						<Text>Continue</Text>
					</Button>
					<Text> </Text>
				<Text> </Text>
				<Text> </Text>
				<Text> </Text>
				<Text> </Text>
				<Text> </Text>
				
			</ScrollView>
	//	</KeyboardAwareScrollView>
  }
}


var radio_props = [
	{ label: 'Male', value: 'm' },
	{ label: 'Female', value: 'f' }
]

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
    paddingTop:10,
	},
	titleText: {
		fontSize: 15,
    color: '#fff',
    
	},
})

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm)