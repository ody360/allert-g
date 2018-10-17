import React from 'react'
import { View, ScrollView, StyleSheet, Text,  StatusBar } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { Card, FormLabel, FormInput, FormValidationMessage, Avatar, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'
import Dimensions from 'Dimensions'

const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch)



class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = { email: '', password: '' };
	}

	static navigationOptions = {
		header: null,
  }
  
  	async componentDidMount() {
			
	
	}

	onEmailChange = event => {
		let newState = { ...this.state }
		newState.email = event
		this.setState(...this.state, newState)
	}

	onPasswordChange = event => {
		let newState = { ...this.state }
		newState.password = event
		this.setState(...this.state, newState)
	};

	render() {
    
		return (
      
			<View style={styles.container}>
        <StatusBar hidden />
				<View style={[styles.box, styles.box1]}>
					<Text style={styles.titleText}>ALLERT-G</Text>
        </View>
				<View style={[styles.box, styles.box2]}>
          <Avatar
            width={DEVICE_WIDTH}
            title="login"
            rounded
            source= {require("../assets/images/avatar-group1.png")}
            onPress={() => console.log("Works!")}
            activeOpacity={0.7}
          />
        
        </View>
				<View style={[styles.box, styles.box3]}>
           
      		<View>
            <FormLabel containerStyle={styles.formLabel}>User Name</FormLabel>
						<FormInput
							onChangeText={email => this.onEmailChange(email)}
							value={this.state.email}
							placeholder="email address"
							autoCorrect={false}
              inputStyle={[{color:'black'}, {marginLeft:1}]}
              containerStyle={styles.formInput}
						/>
						<FormValidationMessage />
					
					
            <FormLabel containerStyle={styles.formLabel}>Password</FormLabel>
						<FormInput
							onChangeText={password => {
								this.onPasswordChange(password);
							}}
							value={this.state.password}
							placeholder="password"
							secureTextEntry={true}
							containerStyle={styles.formInput}
						/>
						<FormValidationMessage />
					</View>
					
          <View>
						<Button
                buttonStyle={{
                  backgroundColor: "rgba(92, 99,216, 1)",
                  width: 300,
                  height: 45,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 30
                }}
                containerStyle={{ marginTop: 20 }}
							onPress={async () => {
								await this.props.login(this.state);
								this.props.navigation.navigate('AuthLoading');
							}}
							title="Sign In"
						/>
						<Button
                buttonStyle={{
                  backgroundColor: "rgba(92, 99,216, 1)",
                  width: 300,
                  height: 45,
                  borderColor: "transparent",
                  borderWidth: 0,
                  borderRadius: 30
                }}
                containerStyle={{ marginTop: 20 }}
							onPress={() => {
								this.props.navigation.navigate('SignUp');
							}}
							title="New User"
						/>
					</View>
				
        </View>
          

			</View>
		);
	}
}

const onButtonPress =  async () => {
  this.props.login(this.state)
}

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window')
let box_count = 3
let box_height = DEVICE_HEIGHT / box_count
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',

		backgroundColor: '#8bc34a',
	},
	button: {
		backgroundColor: 'purple',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		borderRadius: 15,
	},
	box: {
		height: box_height,
		justifyContent: 'center',
	},
	box1: {
		flex: 2,
		backgroundColor: '#8bc34a',
		alignItems: 'center',
	},
	box2: {
		flex: 7,
		backgroundColor: '#8bc34a',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	box3: {
		flex: 6,
		backgroundColor: '#8bc34a',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 30,
	},
	titleText: {
		color: 'red',
		fontSize: 60,
		fontFamily: 'Oswald-Heavy',
	},
	formLabel: {
		backgroundColor: 'black',
		marginLeft: 20,
		marginRight: 20,
	},
	formInput: {
		//paddingRight: 20,
		backgroundColor: '#e0e0eb',
		marginLeft: 20,
		marginRight: 20,
	},
	signin: {
		backgroundColor: 'black',
		borderWidth:1,
		borderRadius: 20,
		borderColor: 'black'
	},
	newUser: {
		backgroundColor: 'red',
		borderRadius: 20,
		color: 'green',
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)