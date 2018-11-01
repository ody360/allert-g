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
  FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfiles, getProfilesId } from '../actions/profiles'
import { checkAllergies } from '../actions/allergies'
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'
import PartyProfile from './PartyProfile'
import { createDrawerNavigator } from 'react-navigation'
import AllergyForm from './AllergyForm'
import Allergies from '../components/Allergies';


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


const formatUserAllergy = arr => {
  let result = {}
  result.title = 'ALLERGIES'
  result.data = []

  for (let i of arr) {
    result.data.push({ allergy_name: i.allergy_name })
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




class ProfilesScreen extends React.Component {

  static navigationOptions = {
     title: 'Personal Profile',
    // drawerLabel: 'Home',
    
  }

  formatUserData = () => {
    let result = []

    const profileObj = this.props.profiles
    const fullName = `${profileObj.data[0].first_name} ${profileObj.data[0].last_name}`
    result.push({name: 'Name', subtitle: fullName})
    
    for(let p in profileObj.data[0]) {
      
      result.push({ name: p, subtitle: profileObj.data[0][p]})
    }
 
    const final = result.filter((i) => i.name === 'Name' || i.name === 'email' || i.name === 'birthdate' || i.name === 'home_phone' ||
          i.name === 'cell_phone' ||
          i.name === 'emergency1' ||
          i.name === 'emergency2' ||
          i.name === 'medhx' ||
          i.name === 'medication'
    )
    final.push({name: 'Allergies', subtitle:''})
    return final
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
    await this.props.getProfiles()
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


  editPage = (type) => {
    switch (type) {
      case 'Allergies':
        this.props.navigation.navigate('EditAllergies')
        break
      case 'home_phone':
      case 'cell_phone':
      case 'emergency1':
      case 'emergency2':
        this.props.navigation.navigate('EditContacts')
        break;
      case 'medhx':
      case 'medication':
        this.props.navigation.navigate('EditMed')
        break;
      default:
    }
  }

  renderRow = ({ item }) => {
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.subtitle}
        avatar={{ uri: item.avatar_url }}
        onPress={() => { 
          this.editPage(item.name)  
          }}
      />
    )
  } 



  render() {
    let list = []
    if(this.props.profiles.data === undefined) {
      return <ActivityIndicator />
    } else {
      list = this.formatUserData()}
  
    return (
      <List>
        <FlatList
          data={list}
          renderItem={this.renderRow}
          keyExtractor={item => item.name}
          
        />
      </List>
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
  subtitleView: {
      flexDirection: 'row',
      paddingLeft: 10,
      paddingTop: 5
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(ProfilesScreen)