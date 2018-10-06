import React from 'react'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { Card, FormLabel, FormInput, FormValidationMessage,  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch)



class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email:'', password:''}
  }

  static navigationOptions = {
    title: 'Please Sign In'
  }

  onEmailChange = event => {
    let newState = { ...this.state }
    newState.email = event
    this.setState(...this.state, newState);
  }

  onPasswordChange = event => {
    let newState = { ...this.state }
    newState.password = event
    this.setState(...this.state, newState);
  }


  render() {
    return <Card keyboardDismissMode="on-drag" contentContainerStyle={{ paddingTop: 65 + 30 }} style={{ flex: 1, backgroundColor: '#F8F8F9' }}>
			<View>
				<FormLabel>User Name</FormLabel>
				<FormInput onChangeText={email => this.onEmailChange(email)} value={this.state.email} placeholder="email address" autoCorrect={false} style={styles.formInput} />
				<FormValidationMessage />
			</View>
			<View>
				<FormLabel>Password</FormLabel>
        <FormInput onChangeText={password => {
          this.onPasswordChange(password)
					}} value={this.state.password} placeholder="password" secureTextEntry={true} style={styles.formInput} />
				<FormValidationMessage />
			</View>
			<View>
				<Button 
          style={styles.button} 
          onPress={async () => {
						await this.props.login(this.state)
            this.props.navigation.navigate('AuthLoading')
					}} 
          title="Sign In" />
				<Button 
          style={styles.newUser} 
          onPress={() => {
						console.log('PRESSED1 ');
            this.props.navigation.navigate('SignUp')
					}} 
          title="New User" />
			</View>
		</Card>;
  }
}

const onButtonPress =  async () => {
  this.props.login(this.state)
  //const userToken = await AsyncStorage.getItem('token');
  //console.log('USERTOKEN: ', this.props.navigation)

  // This will switch to the App screen or Auth screen and this loading
  // screen will be unmounted and thrown away.
  //this.props.navigation.navigate('App');
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: 'purple',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  formInput: {
    paddingRight: 20,
  },
  signin: {
    backgroundColor: 'steelblue',
    borderRadius:20,
    
    
  },
  newUser: {
    backgroundColor: 'red',
    borderRadius: 20,
    color: 'green',


  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)