import React from 'react'
import { View, ScrollView, StyleSheet, Text, StatusBar, DrawerLayoutAndroid, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { login } from '../actions/auth'
import { getParty } from '../actions/party'
import { Card, FormLabel, FormInput, FormValidationMessage, Avatar, Button, Header, Icon } from 'react-native-elements'
//import Icon from 'react-native-vector-icons/FontAwesome'
import Dimensions from 'Dimensions'
import SideMenu from '../components/SideMenu'

const mapStateToProps = ({ party }) => ({ party });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getParty }, dispatch)




class DeleteConfirmScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: '',
   
    }
  }

  static navigationOptions = {
    header: null,
  }

 

  onPress = (item) => {

  }



  render() {
  

    return (

      <View style={styles.container}>

        <StatusBar hidden />
      
      

          <View style={[styles.box, styles.box1]}>

          </View>
          <View style={[styles.box, styles.box2]}>
            <Avatar large rounded source={require('../assets/images/avatar-group1.png')} onPress={() => console.log('Works!')} activeOpacity={0.7} />
            <FormLabel>Are You sure You Want To Delete Group: </FormLabel>
            <Button
              raised
              icon={{ name: 'cached' }}
              title='DELETE'
              backgroundColor={'red'}
              onPress={() => {
              
                this.props.navigation.navigate('AddPeople', { 'state': this.state })
              }
              }
            />



          </View>
          <View style={[styles.box, styles.box3]}>

          </View>

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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeleteConfirmScreen);