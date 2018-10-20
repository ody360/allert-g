import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addAllergies, getAllergies } from '../actions/allergies';
import { Card, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import { Container, Header, Content, Form, Item, Input, Label, Title, Text, Button } from 'native-base';


const mapDispatchToProps = dispatch => bindActionCreators({ addAllergies, getAllergies }, dispatch);



class AddAllergyForm extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef();
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
            <FormInput 
              ref={input => this.input = input}
              onChangeText={(text) => this.onChange(text)} />
					</Item>
				</Form>
				<Button raised title="submit" 
                onPress={async () => { console.log('PRESSED: ', this.props)
						      await this.props.addAllergies(this.state)
                  await this.props.refresh()
                  this.input.clearText();
                  
					      }}
                
                ><Text>Add Allergy</Text></Button>
			</Content>
		</Container>;
  }
}

export default connect(null, mapDispatchToProps)(AddAllergyForm)
