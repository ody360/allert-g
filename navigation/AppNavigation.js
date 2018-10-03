import React from 'react'
import { createSwitchNavigator, createStackNavigator} from 'react-navigation'
import UserProfile from '../screens/UserProfile';
import LoginForm from '../screens/LoginForm';
import NewUserForm from '../screens/NewUserForm';
import AuthLoadingScreen from './AuthLoadingScreen'
import AddAllergy from '../screens/AddAllergy';
import PartyProfile from '../screens/PartyProfile';
import AddMedHx from '../screens/AddMedHx';

const AppStack = createStackNavigator({ Home: UserProfile, Other: PartyProfile })
const AuthStack = createStackNavigator({ Auth: LoginForm, SignUp: NewUserForm, Allergy: AddAllergy, Hx: AddMedHx });

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
