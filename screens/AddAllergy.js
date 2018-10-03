import React from 'react'
import { View, ScrollView, StyleSheet, CheckBox, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Header, Content, ListItem, Body, Title, Text, Form} from 'native-base'
import Dimensions from 'Dimensions'
import Allergies from '../components/Allergies'
import {getAllergies, addAllergies} from '../actions/allergies'
import AddAllergyForm from '../components/AddAllergyForm';

const mapStateToProps = ({ allergies }) => ({ allergies });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getAllergies, addAllergies }, dispatch)



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
    

    //console.log('AFTER MOUNT   ', this.state)
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

  onPress = (id) => { 
    console.log('IN ON PRESS WITH ID:    ', id)
    let allergyId = []
    let tempState = {...this.state}
    
    tempState.allergies.map((allergy) => {
      if(allergy.id === id) {
        allergy.checked = !allergy.checked
      }
      return allergy
    })
    
    this.setState(...this.state,tempState)

    console.log("FINALLY HERERERERE", this.state)

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