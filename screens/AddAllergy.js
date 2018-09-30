import React from 'react'
import { View, ScrollView, StyleSheet, CheckBox } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Header, Content, ListItem, Body, Title, Text, Form} from 'native-base'
import Dimensions from 'Dimensions'
import Allergies from '../components/Allergies'



export default class AddAllergy extends React.Component {
  state = {
    isReady: false,
    checked: false,
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ 
      isReady: true,
      checked: false,
     })
  }

  onPress = (id) => {
    let stick = this.state.checked
    this.setState({
      checked: !stick
    })

  }
  


  render() {

    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }

   

    return (
      <Container style={styles.container}>
			  <Header style={styles.navbar}><Title>ALLERGIES</Title></Header>		
          <Content>
            <Allergies allergies={['peanut','krypto','mano']} checked={this.state.checked} onPress={this.onPress}/>
	        </Content>
	    </Container>
    );
    }
}


const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
  }
})
