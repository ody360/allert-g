import React from 'react'
import { createDrawerNavigator, createSwitchNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import UserProfile from '../screens/UserProfile';
import LoginForm from '../screens/LoginForm';
import NewUserForm from '../screens/NewUserForm';
import AuthLoadingScreen from './AuthLoadingScreen'
import AllergyForm from '../screens/AllergyForm';
import PartyProfile from '../screens/PartyProfile';
import AddMedHx from '../screens/AddMedHx';
import UserConstactsForm from '../screens/UserContactsForm'
import DisclaimerForm from '../screens/DisclaimerForm'
import Preferences from '../screens/Preferences'
import AllergiesScreen from '../screens/AllergiesScreen'
import Emergency from '../screens/Emergency'
import MainPage from '../screens/MainPage'
import GroupScreen from '../screens/GroupScreen'



const AppStack = createStackNavigator({ Home: MainPage, Group: GroupScreen })
const AuthStack = createStackNavigator({
	Auth: LoginForm,
	SignUp: NewUserForm,
	Contacts: UserConstactsForm,
	Allergy: AllergyForm,
	Hx: AddMedHx,
	Disclaimer: DisclaimerForm
})


const AppStack2 = createMaterialTopTabNavigator({
	Home: UserProfile,
	Allergies: AllergiesScreen,
	Party: PartyProfile,
	//Settings: Preferences,
	Emergency: Emergency,
	//Logout: AuthStack,
})

export default createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		Auth: AuthStack,
		App: AppStack,
		Group: GroupScreen,
	},
	{
		initialRouteName: 'AuthLoading',
	}
);


const AppDrawerNavigator = createDrawerNavigator({Home: UserProfile, Other: PartyProfile })
