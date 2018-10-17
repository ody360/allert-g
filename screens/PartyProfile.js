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
	Button,
} from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//import { getProfiles, getProfilesId } from '../actions/profiles'
import { getParty, getMembers, getMembersId } from '../actions/party';
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'

const testProf = {}

const mapStateToProps = ({party}) => ({ party });
const mapDispatchToProps = dispatch => bindActionCreators({  getParty, getMembers, getMembersId  }, dispatch);


class PartyProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selection: 'LOGOUT',
    }
  }


  async componentDidMount() {
   
    await this.props.getParty() 
   
  }


  renderItem = ({ item }) => {
    let fullName = `${item.first_name} ${item.last_name}`
    return (
    <ScrollView style={styles.row} key={item.key} onPress={() => this._handlePressRow(item)}>
        <Button style={styles.rowTitle} title={ fullName } onPress={() => {console.log('Pressed', item.first_name)}} />
          
    </ScrollView>
    )
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

  getPartyMembers = async (arr) => {
    const tempState = this.state
    await this.props.getMembersId(arr)
    
    if(this.props.party.memId !== undefined){
    
    } else {
      return <ActivityIndicator />
    }
  }

  
  handlePressItem = (item) => {
    this.setState({ selection: item })
    AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }


  render() {
				let info = { title: '', data: [] };

				this.props.party.memId === undefined ? <ActivityIndicator /> : (info.data = this.props.party.memId);

				setTimeout(() => this.props.getPartyName === info.title, 1000);
				this.props.getPartyName === '' ? <ActivityIndicator /> : (info.title = this.props.party.getPartyName);

				console.log('INFO IS CURRENTLY ', this.props.party.getPartyName, info);

				let sections = [
				  {
				    title: info.title,
				    data: info.data,
				  }
				]

				return <View style={styles.container}>
						<ImageBackground style={styles.image} source={require('../assets/images/Immune-System2.jpg')}>
							<Text style={styles.title}>ALLERT - G</Text>
							<ToggleButton items={['LOGOUT']} value={this.state.selection} onPressItem={() => this.handlePressItem} />
						</ImageBackground>

						{info.data !== undefined ? <SectionList style={styles.list} sections={sections} renderItem={this.renderItem} renderSectionHeader={this.renderSectionHeader} keyExtractor={(item, index) => item + index} /> : <Text
							>
								Caught in undefined display section
							</Text>}
					</View>;
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


export default connect(mapStateToProps, mapDispatchToProps)(PartyProfile)