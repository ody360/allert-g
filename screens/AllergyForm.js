import React from 'react'
import { View, ScrollView, StyleSheet, CheckBox, ActivityIndicator  } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Header, Content, ListItem, Body, Title, Text, Form, Button } from 'native-base';
import Dimensions from 'Dimensions'
import Allergies from '../components/Allergies'
import {getAllergies, addAllergies} from '../actions/allergies'
import { updateProfile } from '../actions/profiles'
import AddAllergyForm from '../components/AddAllergyForm';

const mapStateToProps = ({ allergies, profiles }) => ({ allergies, profiles });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getAllergies, addAllergies, updateProfile }, dispatch)



class AllergyForm extends React.Component {
  constructor(props) {
    super(props)
    const testState = this.props.navigation.getParam('state')
    this.state = {
      ...testState,
      allergies: [{
        "allergy_name":'',
        "id":1,
        "checked":false
      }],
      isReady: false,
      allergies_id: []
    }
    
  }

  
  async componentDidMount() {
    await this.props.getAllergies()
    this.setState({ 
      ...this.state,
      allergies:this.props.allergies
    }
    )
    
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      
    })
    this.setState({
      isReady: true,
     })
  }

  createAllergyArray = async () => {
    const allergySet = new Set()
    let tempState = {...this.state}

    console.log('TEMPSTATE IS: ', tempState)
    tempState.allergies.map((allergy) => {
      if(allergy.checked) allergySet.add(allergy.id)
    })

    console.log('THE ALLERGIES LIST IS NOW:  ', allergySet)
    await this.setState( {allergies_id: [...allergySet]})
    
  }

  onPress = (id) => { 
    let tempState = {...this.state}
    
    tempState.allergies.map((allergy) => {
      if(allergy.id === id) {
        allergy.checked = !allergy.checked
      }
      return allergy
    })
    
    this.setState(...this.state,tempState)

  }


  render() {
   // console.log('FINAL CHECK:!!!!, ', this.state.allergies_id)
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }

    return (
      <Container style={styles.container}>
			  <Header style={styles.navbar}><Title>ALLERGIES</Title></Header>		
          <Content>
           {this.state.allergies.length <= 1 ? <ActivityIndicator /> : <Allergies allergies={this.state.allergies} onPress={this.onPress}/> }
            <AddAllergyForm key={this.state.allergies_id.length} />
	        </Content>
        <Button full info 
          onPress={() => { 
            this.createAllergyArray()
            
            console.log('MOVING TO NEXT SCREEN BUT CURRENT STATE:  ', this.state)
            this.props.navigation.navigate('Hx', { 'state': this.state })
           
          }}>
          <Text>Continue</Text>
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(AllergyForm)