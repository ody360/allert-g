import React from 'react'
import { View, ScrollView, StyleSheet, CheckBox, ActivityIndicator  } from 'react-native';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Container, Header, Content, ListItem, Body, Title, Text, Form, Button } from 'native-base';
import Dimensions from 'Dimensions'
import Allergies from '../../components/Allergies'
import { getAllergies, checkAllergies} from '../../actions/allergies'
import { updateProfileAllergies } from '../../actions/profiles';
import AddAllergyForm from '../../components/AddAllergyForm'
import {AppLoading, Font} from 'expo'

const mapStateToProps = ({ allergies, profiles }) => ({ allergies, profiles });
const mapDispatchToProps = (dispatch) => bindActionCreators({ getAllergies, checkAllergies, updateProfileAllergies }, dispatch)



class EditAllergy extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      allergies: [],
      isReady: false,
      allergies_id: [],
    }

  
    
  }

  
  async componentDidMount() {
    await this.props.getAllergies()
    await this.props.checkAllergies()
   // const allergies = this.props.allergies.payload
    

    const currentAllergies = this.props.allergies.payload
    const userAllergies = this.props.allergies.userAllergies;
    const checklist = userAllergies.filter((a) => {

      return a.allergies_id
    })

    const allergies = currentAllergies.map((a) => {
      for (let i of userAllergies) {
        if (a.id === i.allergies_id) {
          a.checked = true
        }


      }
      console.log('YAHOOO', allergies)
      return a
    })


    this.setState({
      ...this.state,
      allergies,
    //  userAllergies,
      isReady: true,
    })
    this.createAllergyArray()
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'),
      'Roboto_medium': require('../../assets/fonts/Roboto-Medium.ttf'),
      'Oswald-Regular': require('../../assets/fonts/Oswald-Regular.ttf'),
      'Oswald-Heavy': require('../../assets/fonts/Oswald-Heavy.ttf')
      
    })
    // this.setState({
    //   isReady: true,
    //  })
  }

  createAllergyArray = async () => {
    const allergySet = new Set()
    let tempState = {...this.state}

    tempState.allergies.map((allergy) => {
      if(allergy.checked) allergySet.add(allergy.id)
    })

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
    this.createAllergyArray()
  }

  refresh = async () => {
    await this.props.getAllergies()
    this.setState({
      ...this.state,
      allergies: this.props.allergies.payload
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
           {this.state.allergies.length <= 1 ? <ActivityIndicator /> : <Allergies allergies={this.state.allergies} onPress={this.onPress}/> }
            <AddAllergyForm key={this.state.allergies_id.length} refresh={this.refresh} />
	        </Content>
        <Button full info 
          onPress={() => { 
            this.createAllergyArray()
            console.log('DATA TO BE SENT IS: ', this.state.allergies_id)
            this.props.updateProfileAllergies(this.state.allergies_id)
           
          }}>
          <Text>Update</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditAllergy)