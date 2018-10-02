import React from 'react'
import { createSwitchNavigator, createStackNavigator} from 'react-navigation'
import UserProfile from '../screens/UserProfile';
import LoginForm from '../screens/LoginForm';
import NewUserForm from '../screens/NewUserForm';
import AuthLoadingScreen from './AuthLoadingScreen'
import AddAllergy from '../screens/AddAllergy';

const AppStack = createStackNavigator({ Home: UserProfile, Other: NewUserForm })
const AuthStack = createStackNavigator({ Auth: LoginForm });

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
