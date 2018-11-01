import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Button, Text } from 'react-native'
import { getProfiles } from '../../actions/profiles'
import { Container, Header, Content, Textarea, Form, Title } from 'native-base'
import Dimensions from 'Dimensions'

const mapStateToProps = ({ profiles }) => ({ profiles })
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles }, dispatch)



class EditMedHx extends React.Component {
  constructor(props) {
    super(props)
    const tempState = this.props.navigation.getParam('state');
    this.state = {
            ...tempState,
            medhx:'',
            medication:''
    }
  }

  async componentDidMount() {
    await this.props.getProfiles()
    let medHx = this.props.profiles.data[0].medhx
    let meds = this.props.profiles.data[0].medication
    this.setState({medHx, meds})
  }
 



  render() {
    return <Container style={styles.container}>
			<Header />
			<Content padder>
				<Form>
          <Text>Medical History</Text>
					<Textarea rowSpan={5} bordered value={this.state.medHx} placeholder="Medical History" onChangeText={medhx => {
							this.setState({ medhx });
						}} />
				</Form>

				<Form>
          <Text>Medication</Text>
					<Textarea rowSpan={5} bordered value={this.state.meds} placeholder="Medication" onChangeText={medication => {
							this.setState({ medication });
						}} />
				</Form>

				<Button style={styles.newUser} onPress={() => {
						this.setState(...this.state, this.tempState);
						this.props.navigation.goBack()
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


export default connect(mapStateToProps, mapDispatchToProps)(EditMedHx)