import React from 'react'
// import store from './store'
// import { connect } from 'react-redux'
// import {bindActionCreators} from 'redux'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Header } from 'react-native-elements'
import LoginForm from './screens/LoginForm'
import UserProfile from './screens/UserProfile'
import { createStackNavigator } from 'react-navigation'
import store from './store'
import { Provider } from 'react-redux'

 //const userMainView = createStackNavigator({
// 	  ScheduleList: { screen: Schedule },
// 	  EventDetails: { screen: EventDetails },
// 	}, {
// 		headerMode: 'screen'
//   })


export default class App extends React.Component {

  render() {
    
    return (
      <Provider store={ store() }>
        <View style={styles.container}>
		    	<Header leftComponent={{ icon: 'menu', color: '#fff' }} centerComponent={{ text: 'ALERT~G~LOG IN', style: { color: '#fff' } }} rightComponent={{ icon: 'home', color: '#fff' }} />
			      {/* <UserProfile /> */}
          <LoginForm />
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