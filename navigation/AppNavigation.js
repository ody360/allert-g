import React from 'react'
import { createSwitchNavigator, createStackNavigator} from 'react-navigation'
import UserProfile from '../screens/UserProfile';
import LoginForm from '../screens/LoginForm';
import NewUserForm from '../screens/NewUserForm';
import AuthLoadingScreen from './AuthLoadingScreen'
import AllergyForm from '../screens/AllergyForm';
import PartyProfile from '../screens/PartyProfile';
import AddMedHx from '../screens/AddMedHx';
import UserConstactsForm from '../screens/UserContactsForm'
import DisclaimerForm from '../screens/DisclaimerForm'

const AppStack = createStackNavigator({ Home: UserProfile, Other: PartyProfile })
const AuthStack = createStackNavigator({
	Auth: LoginForm,
	SignUp: NewUserForm,
	Contacts: UserConstactsForm,
	Allergy: AllergyForm,
	Hx: AddMedHx,
	Disclaimer: DisclaimerForm
});

export default createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen, 
		App: AppStack,
		Auth: AuthStack,
	},
	{
		initialRouteName: 'AuthLoading',
	}
);
