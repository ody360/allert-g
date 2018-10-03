import React from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableNativeFeedback } from 'react-native'
import { Header } from 'react-native-elements'
import LoginForm from './screens/LoginForm'
import UserProfile from './screens/UserProfile'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import store from './store'
import { Provider } from 'react-redux'
import NewUserForm from './screens/NewUserForm'
import AddAllergy from './screens/AddAllergy';
import AddAllergyForm from './components/AddAllergyForm'
import AddMedHx from './screens/AddMedHx'
import AppNavigation from './navigation/AppNavigation';


export default class App extends React.Component {
  
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  
  
  render() {
    return <Provider store={store()}>
			<View style={styles.container}>
        <AppNavigation />
        {/* <AddAllergy /> */}
			</View>
		</Provider>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
})