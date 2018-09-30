import React from 'react'
// import store from './store'
// import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
import { StyleSheet, Text, View, Image, AsyncStorage, TouchableNativeFeedback } from 'react-native'
import { Header } from 'react-native-elements'
import LoginForm from './screens/LoginForm'
import UserProfile from './screens/UserProfile'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import store from './store'
import { Provider } from 'react-redux'
import NewUserForm from './screens/NewUserForm'
import AddAllergy from './screens/AddAllergy';

//  const userMainView = createStackNavigator({
//    LoginForm: { screen: LoginForm },
//    UserProfile: { screen: UserProfile },
// 	}, {
//      initialRouteName: UserProfile,
// 		headerMode: 'screen',
//   })

// const AppStack = createStackNavigator({ Home: NewUserForm, Other: UserProfile });
// const AuthStack = createStackNavigator({ SignIn: LoginForm });

export default class App extends React.Component {
  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
  }
  
  render() {
    AsyncStorage.clear()
    const token = null
    try{
      const token = AsyncStorage.getItem('token')
    } catch (e) {
      console.log(e)
      const token = null
    }
    return (
      <Provider store={ store() }>
        <View style={styles.container}>
			      {/* {(!token) ? <LoginForm /> : <UserProfile />} */}
          <AddAllergy />
          {/* <UserProfile /> */}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})