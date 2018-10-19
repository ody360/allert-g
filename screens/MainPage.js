import React from 'react'
import { View, ScrollView, StyleSheet, Text, StatusBar, DrawerLayoutAndroid, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { getParty } from '../actions/party'
import { Card, FormLabel, FormInput, FormValidationMessage, Avatar, Button, Header, Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import AvatarGroup from '../components/AvatarGroup'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Dimensions from 'Dimensions'
import MyAvatar from '../components/MyAvatar'

const mapStateToProps = ({ party }) => ({ party });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getParty }, dispatch)




class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedGroup:0,
     }
  }

  static navigationOptions = {
    header: null, 
  }

  async componentDidMount() {
    await this.props.getParty();
    this.setState({
      navigate: this.props.navigation
    })
  } 

  onPress = (item) => {
    console.log('GOT INPUT: ', item)
    //this.props.navigation.navigate('Group')
    //  this.props.navigation.navigate('Group',{partyId: id})
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={{alignItems:'center'}}>
      <Avatar
        key={index}
        width={DEVICE_WIDTH-200}
        title={item.name}
        rounded
        source={require("../assets/images/avatar-group1.png")}
        activeOpacity={0.7}
        onPress={() => {
          console.log('AVATAR PRESSED WITH STATE: ', this.props)
          this.props.navigation.navigate('Group', { partyId: item.id })
          }
        }
      />
     
        <Text>{item.name}</Text>
      </View>
      
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    let pList = this.props.party.partyList

    let avatarList = []
 
     var navigationView = (
        <View>
        <Text>First View</Text>
        <Text>Second View</Text>
        <Text>Third View</Text>
      </View>
    )

    
      return (

        <View style={styles.container}>
          <StatusBar hidden />
          <Header
            leftComponent={<Icon
              size={35}
              name='menu'
              type='entypo'
              color='#f50'
              onPress={() => console.log('Pressed')} />}
            centerComponent={<Text style={styles.titleText}>ALLERT-G</Text>}
            rightComponent={<Icon
              raised
              name='heartbeat'
              type='font-awesome'
              color='#f50'
              onPress={() => console.log('hello')} />}
            outerContainerStyles={{ backgroundColor: '#8bc34a' }}
            innerContainerStyles={[{ justifyContent: 'space-between' },{alignItems:'center'}]}
          />
          <DrawerLayoutAndroid
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}
            drawerBackgroundColor="rgba(0,0,0,0.5)"
          >
          <View style={[styles.box, styles.box1]}>
          

              
          </View>
          <View style={[styles.box, styles.box2]}>
              {this.props.party.partyList === undefined ? <ActivityIndicator /> :
                <Carousel
                  data={this.props.party.partyList}
                  renderItem={this.renderItem}
                  itemWidth={DEVICE_WIDTH-200}
                  sliderWidth={DEVICE_WIDTH}
                  navigate={navigate}
                                   
                
                />}
              
            {/* <Avatar
              width={DEVICE_WIDTH - 200}
              title="login"
              rounded
              source={require("../assets/images/avatar-group1.png")}
              onPress={() => {
                  //select the pressed group id and call action for it.
                  this.props.navigation.navigate('Group')
                
                }
              }
              activeOpacity={0.7}
            />
            <Avatar
              width={DEVICE_WIDTH - 200}
              title="login"
              rounded
              source={require("../assets/images/avatar-group1.png")}
              onPress={() => {
                  //select the pressed group id and call action for it.
                  this.props.navigation.navigate('Group')
                
                }
              }
              activeOpacity={0.7}
            />
            <Avatar
              width={DEVICE_WIDTH - 200}
              title="login"
              rounded
              source={require("../assets/images/avatar-group1.png")}
              onPress={() => {
                  //select the pressed group id and call action for it.
                  this.props.navigation.navigate('Group')
                
                }
              }
              activeOpacity={0.7}
            />*/}
            
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text>Invite People To App</Text>
            <Icon
              reverse
              raised
              name='md-person-add'
              type='ionicon'
              color='#517fa4'
              size={35}
              
            />

          </View>
          </DrawerLayoutAndroid>
        </View>
      )
    }
  }



const onButtonPress = async () => {
  this.props.login(this.state)
}

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window')
let box_count = 3
let box_height = DEVICE_HEIGHT / box_count
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',

    backgroundColor: '#8bc34a',
  },
  button: {
    backgroundColor: 'purple',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  box: {
    height: box_height,
    justifyContent: 'center',
  },
  box1: {
    flex: 2,
    backgroundColor: '#8bc34a',
    alignItems: 'center',
  },
  box2: {
    flex: 7,
    backgroundColor: '#8bc34a',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  box3: {
    flex: 6,
    backgroundColor: '#8bc34a',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },
  titleText: {
    color: 'red',
    fontSize: 60,
    fontFamily: 'Oswald-Heavy',
  },
  formLabel: {
    backgroundColor: 'black',
    marginLeft: 20,
    marginRight: 20,
  },
  formInput: {
    //paddingRight: 20,
    backgroundColor: '#e0e0eb',
    marginLeft: 20,
    marginRight: 20,
  },
  signin: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black'
  },
  newUser: {
    backgroundColor: 'red',
    borderRadius: 20,
    color: 'green',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)