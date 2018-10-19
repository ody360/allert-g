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
import { checkAllergies, getAllergies } from '../actions/allergies'
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'

const testProf = {}

const mapStateToProps = ({ profiles, allergies }) => ({ profiles, allergies });
const mapDispatchToProps = dispatch =>
	bindActionCreators({ getProfiles, getProfilesId, checkAllergies, getAllergies }, dispatch);



class AllergiesScreen extends React.Component {
	static navigationOptions = {
		title: 'Allergies Screen',
	};

	constructor(props) {
		super(props)
		this.state = {
      selection: 'LOGOUT',
			refreshing: false,
    }
  }

  
	async componentDidMount() {
		await this.props.getProfilesId()
    await this.props.checkAllergies()
    
  }
  
	_onRefresh = () => {
		this.setState({ refreshing: true })
		async () => {
			await this.props.getProfilesId()
		  await this.props.checkAllergies()
			this.setState(
				{ ...this.state, refreshing: false }
			)
		}
  }
  
  allergyNames = async () => {
    let aList = []
    let aNames = []
    let allertList = await this.props.allergies.data
    allertList.map((a) => {
       aList.push(a.allergy_name)
     })


    return aList
  }
  
  formatUserData = async () => {
    let results = {};

    results.title = 'ALLERGIES';
    results.data = [];
    let temp = await this.props.allergies.data
    temp.map((a) => {
      results.data.push({text: a.allergy_name})
    })
    
    return results;
  }

  formatUserAllergy = allergyArray => {
    let result = {}

    result.title = 'ALLERGIES';
    result.data = []

    for (let i = 0; i < allergyArray.length; i++) {
      result.data.push({ text: allergyArray[i] })
    }

   
    return result
  }
  
  renderItem = ({ item }) => {
    return (
      <ScrollView
        style={styles.row}
        key={item.key}
        onPress={() => this._handlePressRow(item)}
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this._onRefresh} />
        } 
      >
          <Text style={styles.rowTitle}>
            {item.allergy_name}
          </Text>
      </ScrollView>
    )
  }

  renderSectionHeader = ({ section }) => {
    return (
      <Text style={styles.header}>
        {section.title}
      </Text>
    )
  }

	handlePressItem = item => {
		this.setState({ selection: item });
	};

	render() {
    
    let info = {title: 'ALLERGIES'}
    let sections = []

    
    while(this.props.allergies.userAllergies === undefined) {
      return <ActivityIndicator />
    }

    info.data = this.props.allergies.userAllergies

    sections.push(info)

    //sections = [{title: 'test', data:[{test:'sample'}]}]

		return (
			<View style={styles.container}>
				<ImageBackground style={styles.image} source={require('../assets/images/Immune-System2.jpg')}>
					<Text style={styles.title}>ALLERT - G</Text>
					<ToggleButton
						items={['LOGOUT']}
						value={this.state.selection}
            onPressItem={() => this.allergyNames()}
					/>
				</ImageBackground>

        
          <SectionList
            style={styles.list}
            sections={sections}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            keyExtractor={(item, index) => item + index}
          /> 

			</View>
		);
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
		fontFamily: 'Oswald-Regular',
	},
	sectionHeaderText: {
		fontSize: 13,
	},
	row: {
		backgroundColor: 'white',
		padding: 20,
	},
	rowTitle: {
		fontSize: 18,
		fontWeight: '500',
		fontFamily: 'Oswald-Heavy',
	},
	rowSpeaker: {
		fontSize: 13,
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(AllergiesScreen)