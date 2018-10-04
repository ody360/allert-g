import React from 'react'
import { View, ScrollView, StyleSheet, CheckBox, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Header, Content, ListItem, Body, Title, Text, Form, Button} from 'native-base'
import Dimensions from 'Dimensions'
import Allergies from '../components/Allergies'
import {getAllergies, addAllergies} from '../actions/allergies'
import { updateProfile } from '../actions/profiles'
import AddAllergyForm from '../components/AddAllergyForm';

const mapStateToProps = ({ allergies, profiles }) => ({ allergies, profiles });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getAllergies, addAllergies, updateProfile }, dispatch)



class AddAllergy extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allergies: [{
        "allergy_name":'',
        "id":1,
        "checked":false
      }],
      isReady: false,
      allergies_id: []
    }
    
    console.log()
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

  createAllergyArray = () => {
    const allergySet = new Set()
    let tempState = {...this.state}

    tempState.allergies.map((allergy) => {
      if(allergy.checked) allergySet.add(allergy.id)
    })
    // tempState.allergies_id = [...allergySet]

    // this.setState({allergies_id:[...this.state.allergies_id, ...allergySet]})
    // console.log('CREATE COMPLETE.  STATE IS: ', this.state)

    //this.setState((state) => update(state,{allergies_id: {$push: [...allergySet]}}))
    this.setState(...this.state, { new_key: [2,3]})

    console.log('CREATE COMPLETE: STATE IS: ', this.state)
  }

  onPress = (id) => { 
    console.log('IN ON PRESS WITH ID:    ', id)
    let tempState = {...this.state}
    
    tempState.allergies.map((allergy) => {
      if(allergy.id === id) {
        allergy.checked = !allergy.checked
      }
      return allergy
    })
    
    this.setState(...this.state,tempState)

  }

  testfn = () => {
    
    let tempState = { ...this.state }
   // console.log('IDS ARE: ', tempState.allergies_id)

    tempState.allergies_id = [1,2,3]

    console.log('TEMPSTATE: ', tempState)
    this.setState(...this.state, tempState)
    console.log( 'STATE IS NOW: ', this.state)
  }
  


  render() {
 
    if (!this.state.isReady) {
      return <Expo.AppLoading />
    }
    
    return (
      <Container style={styles.container}>
			  <Header style={styles.navbar}><Title>ALLERGIES</Title></Header>		
          <Content>
           {this.state.allergies === undefined ? <ActivityIndicator /> : <Allergies allergies={this.state.allergies} onPress={this.onPress}/> }
            <AddAllergyForm />
	        </Content>
        <Button full info 
          onPress={() => { 
          // create allergy array to pass:
            this.testfn(this.state)
            this.createAllergyArray()
          {/* this.props.updateProfile(this.state)
          console.log('MOVING TO NEXT SCREEN BUT CURRENT STATE:  ', this.props.profiles) */}
          //this.props.navigation.navigate('Hx') 
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

export default connect(mapStateToProps, mapDispatchToProps)(AddAllergy)