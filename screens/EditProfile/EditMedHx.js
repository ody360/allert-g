import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { StyleSheet, Button, Text } from 'react-native'
import { getProfiles, updateMedical } from '../../actions/profiles';
import { Container, Header, Content, Textarea, Form, Title } from 'native-base'
import Dimensions from 'Dimensions'

const mapStateToProps = ({ profiles }) => ({ profiles })
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles, updateMedical }, dispatch)



class EditMedHx extends React.Component {
  constructor(props) {
    super(props)
    const tempState = this.props.navigation.getParam('state');
    this.state = {
            ...tempState,
            medhx:'',
            medication:'',
    }
  }

  async componentDidMount() {
    await this.props.getProfiles()
    let medhx = this.props.profiles.data[0].medhx
    let medication = this.props.profiles.data[0].medication
    this.setState({ medhx, medication })
  }
 



  render() {
    return <Container style={styles.container}>
			<Header />
			<Content padder>
				<Form>
          <Text>Medical History</Text>
					<Textarea rowSpan={5} bordered value={this.state.medhx} placeholder="Medical History" onChangeText={medhx => {
							this.setState({ medhx });
						}} />
				</Form>

				<Form>
          <Text>Medication</Text>
					<Textarea rowSpan={5} bordered value={this.state.medication} placeholder="Medication" onChangeText={medication => {
							this.setState({ medication });
						}} />
				</Form>

				<Button style={styles.newUser} onPress={() => {
						this.setState(...this.state, this.tempState);
            this.props.updateMedical(this.state)
            this.props.navigation.navigate('Home', { 'updating': true })
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