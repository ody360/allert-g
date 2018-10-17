import React from 'react'
import { Font, AppLoading} from 'expo'
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableNativeFeedback,  } from 'react-native'
import { Header } from 'react-native-elements'
import LoginForm from './screens/LoginForm'
import UserProfile from './screens/UserProfile'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import store from './store'
import { Provider } from 'react-redux'
import NewUserForm from './screens/NewUserForm'
import AllergyForm from './screens/AllergyForm';
import AddAllergyForm from './components/AddAllergyForm'
import AddMedHx from './screens/AddMedHx'
import AppNavigation from './navigation/AppNavigation';
import UserContactsForm from './screens/UserContactsForm'
import Preferences from './screens/Preferences'
import AllergiesScreen from './screens/AllergiesScreen';
import PartyProfile from './screens/PartyProfile'

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  }

  componentDidMount() {
    this.loadAssetsAsync()
  }

  async loadAssetsAsync () {
    await Expo.Font.loadAsync({
      'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf'),
      'Oswald-Regular': require('./assets/fonts/Oswald-Regular.ttf'),
      'Oswald-Heavy': require('./assets/fonts/Oswald-Heavy.ttf'),
    })

    this.setState({
      fontLoaded: true,
    })
  }
  render() {
    if(!this.state.fontLoaded) {
      return <AppLoading />
    }

    return <Provider store={store()}>
			<View style={styles.container}>
        <AppNavigation />
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