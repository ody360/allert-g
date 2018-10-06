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
    return (
      <View style={styles.container}>
        <Text>Lorem ipsum dolor sit amet consectetur adipiscing elit donec aliquam mattis, mus a hendrerit platea ultrices id convallis penatibus massa, duis eu porttitor tempor parturient suscipit risus sociosqu nibh. Nisl sed luctus imperdiet conubia rhoncus, rutrum fringilla ullamcorper aenean hendrerit, eleifend natoque pharetra quis. Purus eleifend orci proin vitae tempor vestibulum, faucibus egestas metus sem maecenas.  

        </Text>
        <Button
          title="Sign Up!"
          onPress={() => {
              console.log('CLicked Submit', this.state)
              this.props.signup(this.state)
              this.props.navigation.navigate('App', { 'state': this.state })
            }
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
})


export default connect(mapStateToProps, mapDispatchToProps)(DisclaimerForm)