import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Button } from 'react-native';
import { Container, Header, Content, Textarea, Form, Title } from 'native-base';
import Dimensions from 'Dimensions'


export default class AddMedHx extends React.Component {
  constructor(props) {
    super(props)
    const tempState = this.props.navigation.getParam('state');
    this.state = {
            ...tempState,
            medhx:'',
            medication:''
    }
  }
 



  render() {
    
    return <Container style={styles.container}>
			<Header />
			<Content padder>
				<Form>
          <Textarea rowSpan={5} bordered placeholder="Medical History" onChangeText={(medhx) => {
            this.setState({ medhx })
            }} />
				</Form>

				<Form>
          <Textarea rowSpan={5} bordered placeholder="Medication" onChangeText={(medication) => {
            this.setState({ medication })
            }} />
				</Form>

				<Button style={styles.newUser} onPress={() => {
          this.setState(...this.state,this.tempState)
          this.props.navigation.navigate('Disclaimer', { state: this.state });

						
					}} title="SUBMIT" />
			</Content>
		</Container>;
  }
} 

const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: DEVICE_WIDTH,
  }
})
