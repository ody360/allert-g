import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAllergies } from '../actions/allergies'
import { Card, FormLabel, FormInput, FormValidationMessage, Button} from 'react-native-elements'
import { Container, Header, Content, Form, Item, Input, Label, Title } from 'native-base'


const mapDispatchToProps = dispatch => bindActionCreators({ addAllergies }, dispatch);



class AddAllergyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allergy_name:''
    }
  }

  onChange = event => {
    let newState = { ...this.state }
    newState.allergy_name = event
    this.setState(newState);
  }

  render() {
    return <Container>
			<Header>
				<Title>Add Allergy</Title>
			</Header>
      <Content disableKBDismissScroll={true}>
				<Form>
					<Item stackedLabel>
						<Label>Allergy Name</Label>
            <Input onChangeText={(text) => this.onChange(text)} />
					</Item>
				</Form>
				<Button raised title="submit" onPress={() => {
						this.props.addAllergies(this.state)
					}} />
			</Content>
		</Container>;
  }
}

export default connect(null, mapDispatchToProps)(AddAllergyForm)
