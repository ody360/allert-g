import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { Avatar, Divider, FormInput, FormLabel, FormValidationMessage } from 'react-native-elements';
import DatePicker from 'react-native-datepicker'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'
import { Content, ListItem, Radio, Right, Left, Button } from 'native-base'
import { updateProfile } from '../actions/profiles';



const mapStateToProps = ({ profiles }) => ({ profiles });
const mapDispatchToProps = dispatch => bindActionCreators({ updateProfile }, dispatch);



class NewUserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
			formValid: false,
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

					<DatePicker 
							style={{ width: 200 }} 
							date={this.state.birthdate} 
							androidMode="spinner" 
							placeholder="select date" 
							format="YYYY-DD-MM" 
							minDate="1900-05-01" 
							maxDate="2018-06-01" 
							confirmBtnText="Confirm" 
							cancelBtnText="Cancel" 
							customStyles={{ dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: { marginLeft: 36 } }} 
							onDateChange={date => {
								this.setState({ birthdate: date })
							}} 
					/>
					<Content>
						<RadioForm
							radio_props={radio_props}
							initial={null}
							onPress={(value) => { this.setState({ sex: value }) }}
						/>
					</Content>

					<Button full info onPress={() => {
							this.props.navigation.navigate('Contacts', {'state':this.state})  }}>
						<Text>Continue</Text>
					</Button>
		
				
			</ScrollView>

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