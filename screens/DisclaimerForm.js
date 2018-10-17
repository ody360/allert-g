import React from 'react'
import { View, StyleSheet, Button, Text } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { signup } from '../actions/auth';


const mapStateToProps = ({ profiles }) => ({  profiles })
const mapDispatchToProps = dispatch => bindActionCreators({ signup }, dispatch)



class DisclaimerForm extends React.Component {
  constructor(props) {
    super(props)
    const finalState = this.props.navigation.getParam('state')
    this.state = {
      ...finalState,
       accepted: false
    }
  }
  
  render() {
    return <View style={styles.container}>
			<Text style={styles.textStyle}>
				Allert-G is learning source application used to apply development knowledge towards an informative
				and convenient mobile platform. The app allows users to store personal and private information
				concerning healthcare. By using this app the user is willingly conferring any information he/she may
				want to convey for emergency purposes. This app is NOT HIPAA compliant. Information will not be
				shared to any 3rd party application. By signing up, you agree to these terms.
			</Text>
			<Button title="Sign Up!" onPress={() => {
					this.props.signup(this.state);
					this.props.navigation.navigate('App', { state: this.state });
				}} />
		</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  }, 
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(DisclaimerForm)