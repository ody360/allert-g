import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfiles } from '../actions/profiles'
import { checkAllergies } from '../actions/allergies'
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Dimensions from 'Dimensions'
import Moment from 'moment'


const mapStateToProps = ({profiles, allergies}) => ({ profiles, allergies });
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles, checkAllergies }, dispatch);


class Emergency extends React.Component {
	static navigationOptions = {
		title: 'Emergency Script',
		headerStyle: {
			backgroundColor: '#f4511e',
		},
		headerTintColor: '#fff',
		headerTitleStyle: {
			fontWeight: 'bold',
		},


	}
  constructor(props) {
    super(props)
    
    this.state = {
      
    }

  }

  
  async componentDidMount() {
    await this.props.getProfiles()
    await this.props.checkAllergies()
  }

  

  render() {
    if (this.props.profiles.data === undefined || this.props.allergies.userAllergies === undefined) {
      return (<ActivityIndicator />)
    } else {
      var profiles = this.props.profiles.data[0]
      var allergyList = this.props.allergies.userAllergies
    }
    let bday = Moment().diff(profiles.birthdate, 'years');
    let allergyText = ''
    for(let i of allergyList) {
      allergyText += `${i.allergy_name} ` 
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>The person is a {bday} year old, {profiles.sex === 'm' ? 'male ' : 'female '} 
          complaining/found with symptoms of ____________(UNCONSCIOUS/CHESTPAIN/DIFFICULTY BREATHING/ ETC).</Text>

          <Text style={styles.title}>This person has a stated history of {profiles.medhx}, and is currently taking: {profiles.medication}. 

          {profiles.sex === 'm' ? 'He': 'She'} is known to have allergies to: {allergyText}
        </Text>
      </View>
    )
  }

}

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F05151',
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
		color: 'white',
		fontSize: 24,
		marginBottom: 10,
		padding: 10,
		fontWeight: '500',
		fontFamily: 'Oswald-Heavy',
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


export default connect(mapStateToProps, mapDispatchToProps)(Emergency)