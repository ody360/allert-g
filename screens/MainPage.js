import React from 'react'
import { View, ScrollView, StyleSheet, Text, StatusBar, DrawerLayoutAndroid, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { getParty, deleteParty } from '../actions/party';
import { Card, FormLabel, FormInput, FormValidationMessage, Avatar, Button, Header, Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import AvatarGroup from '../components/AvatarGroup'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Dimensions from 'Dimensions'
import MyAvatar from '../components/MyAvatar'
import SideMenu from '../components/SideMenu'

const mapStateToProps = ({ party }) => ({ party });
const mapDispatchToProps = dispatch => bindActionCreators({ getParty, deleteParty }, dispatch);




class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      selectedGroup:0,
      drawerOpen: false,
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
  }

  renderItem = ({ item, index }) => {
    return (
      <View style={{alignItems:'center'}}>
      {(item.img_URL === '') ? <Avatar
            key={index}
            width={DEVICE_WIDTH - 200}
            title={item.name}
            rounded
            source={require("../assets/images/avatar-group1.png")}
            activeOpacity={0.7}
            onPress={() => {
                console.log('AVATAR PRESSED WITH PROPS: ', this.props)
                this.props.navigation.navigate('Group', { partyId: item.id })
              }
            }
            onLongPress={() => {
                console.log('LONG PRESSED: ', item.id)
                this.props.deleteParty(item.id)
              }
            }

          /> : <Avatar
            key={index}
            width={DEVICE_WIDTH - 200}
            title={item.name}
            rounded
            source={{uri:item.img_URL}}
            activeOpacity={0.7}
            onPress={() => {
              console.log('AVATAR PRESSED WITH PROPS: ', item.id)
              if(item.id === 'new') {this.props.navigation.navigate('AddGroup')}
              else {
                this.props.navigation.navigate('Group', { partyId: item.id })
              }
            }
            }
          />}        
        <Text>{item.name}</Text>

      </View>
      
    )
  }

  render() {
    const { navigate } = this.props.navigation
    const newGroup = {
      id: 'new',
      description: 'New Group',
      img_URL: 'https://cdn4.iconfinder.com/data/icons/e-commerce-icon-set/48/More-512.png',
      name: 'Add New Group',  
    }
    let tempSet = new Set()
    let pList = this.props.party.partyList
 
     var navigationView = (
       <SideMenu navigate={this.props.navigation} />
    )

    if(pList === undefined) {
      return <ActivityIndicator />
    } else {
      pList.map(i => {
        tempSet.add(i)
      })
      tempSet.add(newGroup)
    }
    
    let groupData = Array.from(tempSet)
      
    
    return (
       
        <View style={styles.container}>
          
          <StatusBar hidden />
          <Header
            leftComponent={<Icon
              size={35}
              name='menu'
              type='entypo'
              color='#f50'
              onPress={() => {
                    let tempState = this.state.drawerOpen
                    this.state.drawerOpen ? this.refs['DRAWER_REF'].closeDrawer() :
                    this.refs['DRAWER_REF'].openDrawer()

                    this.setState({...this.state,drawerOpen: !tempState})
                  }
              } 
            />}
            centerComponent={<Text style={styles.titleText}>ALLERT-G</Text>}
            rightComponent={<Icon
              raised
              name='heartbeat'
              type='font-awesome'
              color='#f50'
              onPress={() => {
                  this.props.navigation.navigate('Emergency')
                }
              }
              />
            }
            outerContainerStyles={{ backgroundColor: '#8bc34a' }}
            innerContainerStyles={[{ justifyContent: 'space-between' },{alignItems:'center'}]}
          />
          <DrawerLayoutAndroid
            ref={'DRAWER_REF'}
            drawerWidth={300}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => navigationView}
            drawerBackgroundColor="#F4F5DA"
          >
       
          <View style={[styles.box, styles.box1]}>
          

              
          </View>
          <View style={[styles.box, styles.box2]}>
              {this.props.party.partyList === undefined ? <ActivityIndicator /> :
                <Carousel
                  data={groupData}
                  renderItem={this.renderItem}
                  itemWidth={DEVICE_WIDTH-200}
                  sliderWidth={DEVICE_WIDTH}
                  navigate={navigate}
                                   
                
                />}
            
          </View>
          <View style={[styles.box, styles.box3]}>
            <Text>Hold Down Group To Delete</Text>
            <Icon
              reverse
              raised
              name='md-person-add'
              type='ionicon'
              color='#517fa4'
              size={35}
              onPress={() => this.props.navigation.navigate('AddGroup')}
              
            />
            <Text>Add New Group</Text>

          </View>
          </DrawerLayoutAndroid>
        </View>
      )
    }
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
    color: 'black',
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