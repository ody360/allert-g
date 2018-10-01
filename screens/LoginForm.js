import React from 'react'
import { View, ScrollView, StyleSheet, Text, Button } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { Card, FormLabel, FormInput, FormValidationMessage,  } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


const mapStateToProps = ({ auth }) => ({ auth });
const mapDispatchToProps = (dispatch) => bindActionCreators({ login }, dispatch)





onChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
}

onButtonPress = () => {
  try {
    this.props.login(this.state)
  } catch(e) {
    console.log('CREATE NEW USER',e)
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email:'', password:''}
  }


  render() {
    return (
      <View style={{ flex: 1 }}>
			  <Card keyboardDismissMode="on-drag" contentContainerStyle={{ paddingTop: 65 + 30 }} style={{ flex: 1, backgroundColor: '#F8F8F9' }}>
				<View>
					<FormLabel>User Name</FormLabel>
					<FormInput 
            onChangeText={email => this.setState({...this, email})} 
             value={this.state.email} 
             placeholder="email address"
             autoCorrect={false}
             style={styles.formInput} />
					<FormValidationMessage />
				</View>
				<View>
					<FormLabel>Password</FormLabel>
					<FormInput 
            onChangeText={password => {this.setState({...this.state, password })}}
            value={this.state.password} 
            placeholder="password"
            secureTextEntry={true} 
            style={styles.formInput} />
					<FormValidationMessage />
				</View>
				<View>
					<Button 
            style={styles.button}
            onPress={() => {
                this.props.login(this.state)
              }
            } 
            title="Sign In" />
            <Button
              style={styles.newUser}
              onPress={() => {
                console.log('PRESSED1');
               // this.props.login(this.state)
              }
              }
              title="New User" />
				</View>
			</Card>
    </View>
    );
  }
}

const onButtonPress =  () => {
  
  console.log("ABOUT TO SEND IN: ", this.state)
  this.props.login(this.state)
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