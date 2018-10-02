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
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfiles, getProfilesId } from '../actions/profiles';
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'

const testProf = {}

const mapStateToProps = ({ profiles }) => ({ profiles });
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles, getProfilesId }, dispatch);


const testProfile = [
	{
		title:  'MAIN USER PROFILE',
		data: [
			{
				first_name: 'Clark',
				last_name: 'Kent',
				email: 'super@man.com',
				birthdate: '1978-08-04',
				sex: 'm',
				home_phone: '3604790142',
				cell_phone: '3601111111',
				emergency1: '3602222222',
				emergency2: '3603333333',
			},
		],
	},
	// {
	// 	title: 'ALLERGIES',
	// 	data: [
	// 		{
	// 			'0': 'peanut',
	// 			'1': 'avocado',
	// 			'2': 'kryptonite'
	// 		}
	// 	],
	// },
	// {
	// 	title: 'MEDICATION',
	// 	data: [
	// 		{
	// 			'0': 'peanut',
	// 			'1': 'avocado',
	// 			'2': 'kryptonite'
	// 		}
	// 	],
	// },
	// {
	// 	title: 'MEDICAL HISTORY',
	// 	data: [
	// 		{
	// 			'0': 'peanut',
	// 			'1': 'avocado',
	// 			'2': 'kryptonite'
	// 		}
	// 	],
	// },
]



const formatUserData = (obj) => {
	let result = {}
	let profile = obj
	result.title = 'TEST MAIN PROFILE'
	result.data = []
	// console.log('OBJ IS ', profile)
	result.data.push(profile)

	return result
}




class UserProfile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selection: 'PROFILE'
		}
	}
	async componentDidMount() {
		await this.props.getProfilesId(1)
		this.setState({
			...this.state,
			profiles: this.props.profiles
		})
	}

	
renderItem = ({ item }) => {
	return <ScrollView style={styles.row} key={item.key} onPress={() => this._handlePressRow(item)}>
			<Text style={styles.rowTitle} >
				{item.first_name}
			</Text>
			<Text style={styles.rowTitle} >
				{item.last_name}
			</Text>
			<Text style={styles.rowTitle} >
				{item.email}
			</Text>
			<Text style={styles.rowTitle} >
				{item.birthdate}
			</Text>
			<Text style={styles.rowTitle} >
				{item.sex}
			</Text>
			<Text style={styles.rowTitle} >
				{item.home_phone}
			</Text>
			<Text style={styles.rowTitle} >
				{item.cell_phone}
			</Text>
			<Text style={styles.rowTitle} >
				{item.emergency1}
			</Text>
			<Text style={styles.rowTitle} >
				{item.emergency2}
			</Text>
			<Text style={styles.rowSpeaker}>{item.speaker}</Text>
	</ScrollView>;
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
			testProf = formatUserData(test[0]);
		}
	}
	displaySection.push(testProf)
	
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