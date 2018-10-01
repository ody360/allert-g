import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, Text, View } from 'react-native';
import LoginForm from '../screens/LoginForm';


export default class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		// this._bootstrapAsync();
	}

	// Fetch the token from storage then navigate to our appropriate place
	componentDidMount = async () => {
   
   try{
     const userToken = await AsyncStorage.getItem('token');
     console.log('USERTOKEN: ', this.props.navigation)

     // This will switch to the App screen or Auth screen and this loading
     // screen will be unmounted and thrown away.
     this.props.navigation.navigate('AuthStack');
   } catch(e) {
     console.log('ERROR: ', e)
     this.props.navigation.navigate('AuthStack')
   }
	};

	// Render any loading content that you like here
	render() {
		return (
			<View>
				{/* <ActivityIndicator /> */}
        <Text>HELLO</Text>
				{/* <StatusBar barStyle="default" /> */}
			</View>
		);
	}
}
