import React from 'react'
import {
	TouchableNativeFeedback,
	StyleSheet,
	Text,
	View,
	Image,
	ImageBackground,
	SectionList,
	ScrollView,
	ActivityIndicator,
	RefreshControl,
	AsyncStorage,
	AppLoading,
	Button,
	DrawerLayoutAndroid,
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfiles, getProfilesId } from '../actions/profiles'
import { checkAllergies } from '../actions/allergies'
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'
import {Font} from 'expo'
import PartyProfile from './PartyProfile'
import { createDrawerNavigator} from 'react-navigation'
import AllergyForm from './AllergyForm';
const testProf = {}

const mapStateToProps = ({ profiles, allergies }) => ({ profiles, allergies });
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles, getProfilesId, checkAllergies }, dispatch);
const MyApp = createDrawerNavigator({
	Home: {
		screen: AllergyForm,
	},
	Notifications: {
		screen: PartyProfile,
	},
});

const formatUserData = (obj) => {
	let result = {}

	result.title = 'USER MAIN PROFILE'
	result.data = []
	let temp = {}
	temp.first_name = obj.first_name
	temp.last_name = obj.last_name
	temp.email = obj.email
	temp.birthdate = obj.birthdate
	temp.sex = obj.sex
	temp.home_phone = obj.home_phone
	temp.cell_phone = obj.cell_phone
	temp.emergency1 = obj.emergency1
	temp.emergency2 = obj.emergency2
	temp.medhx = ''
	temp.medication = ''

	result.data.push(temp)
		
	return result
}

const formatUserAllergy = arr => {
	let result = {}
	result.title = 'ALLERGIES'
	result.data = []

	for(let i of arr) {
		result.data.push({allergy_name: i.allergy_name})
	}

	return result
}

const formatUserMed = obj => {
	let result = {}
	result.title = 'MEDICAL HISTORY'
	result.data = []
	let temp = {}
	temp.first_name = ''
	temp.last_name = ''
	temp.email = ''
	temp.birthdate = ''
	temp.sex = ''
	temp.home_phone = ''
	temp.cell_phone = ''
	temp.emergency1 = ''
	temp.emergency2 = ''
	temp.medhx = obj.medhx
	temp.medication = obj.medication

	result.data.push(temp)

	return result
}




class UserProfile extends React.Component {
	
	static navigationOptions = {
		title: 'Allert Group Application',
		drawerLabel: 'Home',
		drawerIcon: ({tintColor}) => {
			<Image
				source={(require('../assets/images/icon.png'))}
				style={[styles.icon, {tintColor: tintColor}]}
				/>
			}
		}
	

	constructor(props) {
		super(props)
		this.state = {
			"allergy_name": "",
			"checked": false,
			"id": "",
			selection: 'LOGOUT',
			refreshing: false,
			isReady: false,
		}
	}
	async componentDidMount() {
		await this.props.getProfilesId()
		await this.props.checkAllergies() 
		await Expo.Font.loadAsync({
				'Roboto': require('../assets/fonts/Roboto-Regular.ttf'),
				'Roboto_medium': require('../assets/fonts/Roboto-Medium.ttf'),
				'Oswald-Regular': require('../assets/fonts/Oswald-Regular.ttf'),
				'Oswald-Heavy': require('../assets/fonts/Oswald-Heavy.ttf')

		})

		this.setState({
				isReady: true,
		})
	}



	_onRefresh = () => {
		this.setState({ refreshing: true })
		async () => {
			await this.props.getProfilesId()
			await this.props.checkAllergies()
			this.setState({
					...this.state,
					refreshing: false 
			})
		}
	}

	
renderItem = ({ item }) => {
				if(this.state.isReady === false) {
					return <ActivityIndicator />
				}	
				return (
					<ScrollView style={styles.row} key={item.key} onPress={() => this._handlePressRow(item)}
						refreshControl={
								<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={() => this._onRefresh}
								/>}
							>
						
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							NAME: {item.first_name} 	{item.last_name}
						</Text> : null}
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							EMAIL:  {item.email}
						</Text> : null}
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							Birthdate: {item.birthdate}
						</Text> : null}
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							{item.sex === 'm' ? `Sex: Male`: `Sex: Female`}
						</Text> : null}
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							Home Phone: {item.home_phone}
						</Text> : null}
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							Cell Phone:   {item.cell_phone}
						</Text> : null}
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							Emergency1 : {item.emergency1}
						</Text> : null}
						{item.first_name !== '' ?
						<Text style={styles.rowTitle} >
							Emergency2 : {item.emergency2}
						</Text> : null}
						{item.medhx !== '' ?
						<Text style={styles.rowTitle} >
							Medical History : {item.medhx}
						</Text> : null}
							{item.medhx !== '' ?
						<Text style={styles.rowTitle} >
							Medication : {item.medication}
						</Text> : null}
							{item.allergy_name !== '' ?
						<Text style={styles.rowTitle} >
							{item.allergy_name}
						</Text> : null}	
					
				</ScrollView>)
			
	}

	renderSectionHeader = ({ section }) => {
		return (
			<View style={styles.sectionHeader} key={section.key}>
				<Text style={styles.sectionHeaderText}>
					{section.title}
				</Text>
			</View>
		)
	}

handlePressItem = (item) => {
		this.setState({ selection: item })
		AsyncStorage.clear()
		this.props.navigation.navigate('Auth')
  }


render() {
	let displaySection = []

	if(this.props.profiles.data === undefined) {
		return (<ActivityIndicator />)
	} else {
		let user = this.props.profiles.data
		for (let o in user) {
			userProfile = formatUserData(user[0]);
			medhx = formatUserMed(user[0]);
		}
	if(this.props.allergies.userAllergies === undefined) {
		return <ActivityIndicator />
	} else {
		let allergies = this.props.allergies.userAllergies
		allergyProf = formatUserAllergy(allergies)
	}
		
	}
	displaySection.push(userProfile)
	displaySection.push(medhx)
	var navigationView = (
		<View style={{ flex: 1, backgroundColor: '#fff' }}>
			<Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>
		</View>
	)
	
  return (
    <View style={styles.container}>
			<DrawerLayoutAndroid
				drawerWidth={300}
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				renderNavigationView={() => navigationView}>		
      <ImageBackground style={styles.image} source={require('../assets/images/Immune-System2.jpg')}>
        <Text style={styles.title}>ALLERT - G</Text>
        <ToggleButton
          items={['LOGOUT']}
          value={this.state.selection}
          onPressItem={this.handlePressItem} />
				<Button
						onPress={() => DrawerLayoutAndroid.openDrawer()}
						title="Go to drawer"
				/>
			
      </ImageBackground>
		
			{ displaySection[0].data.length !== undefined ? 
			<SectionList
				style={styles.list}
				sections={ displaySection }
				renderItem={this.renderItem}
				renderSectionHeader={this.renderSectionHeader}
				keyExtractor={(item, index) => item + index}
				/> : <ActivityIndicator /> } 
			</DrawerLayoutAndroid>
    </View>
    )
  }
}



const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	image: {
		height: null,
		width: DEVICE_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	logo: {
		height: 40,
		width: 40,
		marginBottom: 10,
	},
	title: {
		backgroundColor: 'transparent',
		color: 'red',
		fontSize: 24,
		marginBottom: 10,
		fontWeight: '500',
	},
	list: {
		flex: 1,
	},
	sectionHeader: {
		backgroundColor: 'whitesmoke',
		padding: 20,
	},
	sectionHeaderText: {
		fontSize: 24,
		fontFamily: 'Oswald-Regular',
	},
	row: {
		backgroundColor: 'white',
		padding: 20,
	},
	rowTitle: {
		fontSize: 14,
		fontWeight: '500',
		fontFamily: 'Roboto_medium',
	},
	rowSpeaker: {
		fontSize: 13,
	},
	icon: {
		width: 24,
		height: 24,
	},
});


export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)