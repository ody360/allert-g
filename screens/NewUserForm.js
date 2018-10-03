import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { TextInput, View, StyleSheet, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
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
    return <View style={styles.container}>
			
			<ScrollView contentContainerStyle={{ paddingTop: 30 }} style={{ flex: 1, backgroundColor: '#f8f8f9' }} 
        keyboardDismissMode="on-drag" 
        overScrollMode='always'>
				<KeyboardAvoidingView enabled>
					<Avatar medium rounded source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/kfriedson/128.jpg' }} onPress={() => console.log('Works!')} activeOpacity={0.7} />
					<FormLabel>Name</FormLabel>
					<FormInput placeholder="First Name" />
					<FormInput placeholder="Last Name" />

					<FormLabel>Email</FormLabel>
					<FormInput placeholder="user@test.com" />
					<FormLabel>Password</FormLabel>
					<FormInput placeholder="Last Name" />
					<FormLabel>Confirm Password</FormLabel>
					<FormInput placeholder="Last Name" />

					<DatePicker style={{ width: 200 }} date={this.state.birthdate} androidMode="spinner" placeholder="select date" format="MM-DD-YYYY" minDate="1900-05-01" maxDate="2018-06-01" confirmBtnText="Confirm" cancelBtnText="Cancel" customStyles={{ dateIcon: { position: 'absolute', left: 0, top: 4, marginLeft: 0 }, dateInput: { marginLeft: 36 } }
							// ... You can check the source to find the other keys.
						} onDateChange={date => {
							this.setState({ birthdate: date });
						}} />
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

					<Button full info onPress={() => {this.props.navigation.navigate('Allergy')}}>
						<Text>Continue</Text>
					</Button>

					<View>
						<Text> </Text>
					</View>
					<View>
						<Text> </Text>
					</View>
					<View>
						<Text> </Text>
					</View>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>;
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
    paddingTop:10,
	},
	titleText: {
		fontSize: 15,
    color: '#fff',
    
	},
});