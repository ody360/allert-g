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
} from 'react-native';
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'


const testProfile = [
	{
		title: 'MAIN USER PROFILE',
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
	{
		title: 'ALLERGIES',
		data: [
			{ 
				'0':'peanut',
				'1':'avocado',
				'2':'kryptonite'
			}
		],
	},
	{
		title: 'MEDICATION',
		data: [
			{
				'0': 'peanut',
				'1': 'avocado',
				'2': 'kryptonite'
			}
		],
	},
	{
		title: 'MEDICAL HISTORY',
		data: [
			{
				'0': 'peanut',
				'1': 'avocado',
				'2': 'kryptonite'
			}
		],
	},
];

const testData = [		
			"id": 1,
			"first_name": "Clark",
			"last_name": "Kent",
			"email": "super@man.com",
			"birthdate": "1978-08-04",
			"sex": "m",
			"home_phone": "3604790142",
			"cell_phone": "3601111111",
			"emergency1": "3602222222",
			"emergency2": "3603333333",
		]

export default class UserProfile extends React.Component {
static navigationOptions = {
	title:'USERPROFILE'
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
	return(
	<Text>IN USERPROFILE</Text>)
  // const {selection} = this.state
  // return (
  //   <View style={styles.container}>
  //     <ImageBackground style={styles.image} source={require('../assets/images/Immune-System2.jpg')}>
  //       <Text style={styles.title}>ALLERT - G</Text>
  //       <ToggleButton
  //         items={['PROFILE','PARTY','PREFS']}
  //         value={selection}
  //         onPressItem={this.handlePressItem} />
  //     </ImageBackground>
	// 		<SectionList
	// 			style={styles.list}
	// 			sections={testProfile}
	// 			renderItem={this.renderItem}
	// 			renderSectionHeader={this.renderSectionHeader}
	// 		/>
  //   </View>
  //   )
  // }
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
