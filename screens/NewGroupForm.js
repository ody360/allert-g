import React from 'react'
import { View, ScrollView, StyleSheet, Text, StatusBar, DrawerLayoutAndroid, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { getParty } from '../actions/party'
import { Card, FormLabel, FormInput, FormValidationMessage, Avatar, Button, Header, Icon } from 'react-native-elements'
import Dimensions from 'Dimensions'
import SideMenu from '../components/SideMenu'

const mapStateToProps = ({ party }) => ({ party });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getParty }, dispatch)




class NewGroupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
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
  }

  

  render() {
    var navigationView = (
      <SideMenu navigate={this.props.navigation} />
    )

    return (
      
      <View style={styles.container}>

        <StatusBar hidden />
        <Header
          leftComponent={
            {/* <Icon
            size={35}
            name='menu'
            type='entypo'
            color='#f50'
            onPress={() => {
              let tempState = this.state.drawerOpen
              this.state.drawerOpen ? this.refs['DRAWER_REF'].closeDrawer() :
                this.refs['DRAWER_REF'].openDrawer()

              this.setState({ ...this.state, drawerOpen: !tempState })
            }
            }
          /> */}
          }
          centerComponent={<Text style={styles.titleText}>ALLERT-G</Text>}
          rightComponent={
            {/* <Icon
            raised
            name='heartbeat'
            type='font-awesome'
            color='#f50'
            onPress={() => {
              this.props.navigation.navigate('Emergency')
            }
            }
          /> */}
          }
          outerContainerStyles={{ backgroundColor: '#8bc34a' }}
          innerContainerStyles={[{ justifyContent: 'space-between' }, { alignItems: 'center' }]}
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
            <Avatar large rounded source={require('../assets/images/avatar-group1.png')} onPress={() => console.log('Works!')} activeOpacity={0.7} />
            <FormLabel>Group Name</FormLabel>
            <FormInput containerStyle={styles.formInput} textInputRef="groupName" placeholder="Group Name" onChangeText={(text) => this.setState({ groupName: text })} />
            <Button
              raised
              icon={{ name: 'cached' }}
              title='Continue'
              backgroundColor={'blue'} 
              onPress={() => {
                  //this.props.updateProfile(this.state)
                  this.props.navigation.navigate('AddPeople', { 'state': this.state })
                }
              }
              />



          </View>
          <View style={[styles.box, styles.box3]}>
         
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
    padding: 10,
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

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupForm)