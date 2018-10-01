import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Button } from 'react-native';
import { Container, Header, Content, Textarea, Form, Title } from 'native-base';
import Dimensions from 'Dimensions'


export default class AddMedHx extends React.Component {
  constructor() {
    super()
    this.state = { isReady: false }
  }
 



  render() {
    return (
      <Container style={styles.container}>
        <Header> 
        </Header>
        <Content padder>
          <Form>
            <Textarea rowSpan={5} bordered placeholder="Medical History" />
          </Form>
         
          <Form>
            <Textarea rowSpan={5} bordered placeholder="Medication" />
          </Form>

          <Button
            style={styles.newUser}
            onPress={() => {
                console.log('PRESSED1');
              }
            }
            title="SUBMIT" />
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
