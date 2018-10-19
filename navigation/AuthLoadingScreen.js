import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, Text, View } from 'react-native';

export default class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this._bootstrapAsync()
		state = {
				fontLoaded: false,
				navigate: this.props.navigation,
			}
		}

		async componentDidMount() {
			await Expo.Font.loadAsync({
				'Roboto': require('../assets/fonts/Roboto-Regular.ttf'),
				'Roboto-Medium': require('../assets/fonts/Roboto-Medium.ttf'),
				'Oswald-Regular': require('../assets/fonts/Oswald-Regular.ttf'),
				'Oswald-Heavy': require('../assets/fonts/Oswald-Heavy.ttf')
			})

	//	this.setState({ fontLoaded: true })
	}

	// Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
	  //AsyncStorage.clear()
    const userToken = await AsyncStorage.getItem('token');

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate(userToken !== null ? 'App' : 'Auth');
	};

	// Render any loading content that you like here
	render() {
		return (
			<View>
				<ActivityIndicator size={'large'} color={'red'}/>
				<Text style={[{ fontWeight: 'bold' },{color:'red'}]}>Preparing Application</Text>
				<StatusBar barStyle="default" />
			</View>
		);
	}
}
