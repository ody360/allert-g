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
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfiles, getProfilesId } from '../actions/profiles'
import { checkAllergies } from '../actions/allergies'
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'

const testProf = {}

const mapStateToProps = ({ profiles, allergies }) => ({ profiles, allergies });
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles, getProfilesId, checkAllergies }, dispatch);


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
		console.log('MY NAME IS::: TTICIICIC' , i.allergy_name)
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
	}

	constructor(props) {
		super(props)
		this.state = {
			"allergy_name": "",
			"checked": false,
			"id": "",
			selection: 'PROFILE',
			refreshing: false
		}
	}
	async componentDidMount() {
		const profiles = await this.props.getProfilesId()
		const allergies = await this.props.checkAllergies()

		
		this.setState({
			...this.state,
			profiles,
			...allergies
		})
	}

	_onRefresh = () => {
		this.setState({ refreshing: true })
		async () => {
			const profiles = await this.props.getProfilesId()
			const allergies = await this.props.checkAllergies()
			this.setState({
					...this.state,
					profiles,
					...allergies
				},
				{ refreshing: false })
		}
	}

	
renderItem = ({ item }) => {
	console.log('ITEM TO BE PROCESSEDDEEDDSSED:   ', item)
	
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
  }


render() {
	let displaySection = []

	if(this.props.profiles.data === undefined) {
		return (<ActivityIndicator />)
	} else {
		let test = this.props.profiles.data
		for (let o in test) {
			testProf = formatUserData(test[0])
			medhx = formatUserMed(test[0])
		}
	if(this.props.allergies.data === undefined) {
		return <ActivityIndicator />
	} else {
		let allergies = this.props.allergies.data
		allergyProf = formatUserAllergy(allergies)
	}
		
	}
	displaySection.push(testProf)
	displaySection.push(medhx)
//	displaySection.push(allergyProf);
	
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('../assets/images/Immune-System2.jpg')}>
        <Text style={styles.title}>ALLERT - G</Text>
        <ToggleButton
          items={['PROFILE','PARTY','PREFS']}
          value={this.state.selection}
          onPressItem={this.handlePressItem} />
      </ImageBackground>
		
			{ displaySection[0].data.length !== undefined ? 
			<SectionList
				style={styles.list}
				sections={ displaySection }
				renderItem={this.renderItem}
				renderSectionHeader={this.renderSectionHeader}
				keyExtractor={(item, index) => item + index}
				/> : <ActivityIndicator /> } 
				
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
		fontSize: 13,
	},
	row: {
		backgroundColor: 'white',
		padding: 20,
	},
	rowTitle: {
		fontSize: 13,
		fontWeight: '500',
	},
	rowSpeaker: {
		fontSize: 13,
	},
});


export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)