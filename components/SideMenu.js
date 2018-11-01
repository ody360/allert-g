import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styles from '../styles/styles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getParty } from '../actions/party'
import { NavigationActions } from 'react-navigation'
import { ScrollView, Text, View, ActivityIndicator, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements'
import MemberSelect from './MemberSelect'

const mapStateToProps = ({ party }) => ({ party })
const mapDispatchToProps = dispatch => bindActionCreators({ getParty }, dispatch)


class SideMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      partyNames: [],
      partyId: [],
      isLoaded: false
    }

  }

async componentDidMount () {
  this.props.getParty()
  let partyNames = []
  const gl = this.props.party.partyList.map((p) => {
    partyNames.push({name:p.name, pid: p.party_id})
    this.setState({ partyNames, isLoaded: true })
  })

}
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigate.dispatch(navigateAction);
  }

  onPress = (id, name) => {
    this.props.navigate.navigate('EditPeople', { state: { groupName: name, groupId: id } });
  }

  render() {
    if(!this.state.isLoaded) {
      return <ActivityIndicator /> 
    }
    
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Profile
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Profile')}>
                Edit Profile
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Edit Group
            </Text>
            <View style={styles.navSectionStyle}>
              {this.state.partyNames.length < 1 ? <ActivityIndicator /> : <MemberSelect group={this.state.partyNames} onPress={this.onPress} />}
            </View>
          </View>
        </ScrollView>
        <View>
          <Button
            reverse
            large
            backgroundColor={'#24B6FF'}
            icon={{ name: 'sign-out', type: 'font-awesome' }}
            title='LOGOUT' 
            onPress={() => {
                AsyncStorage.clear()
                this.props.navigate.navigate('Auth')
              }
            }
          />
        </View>
      </View>
    )
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu)