import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from '../styles/styles';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';



class SideMenu extends Component {
  constructor(props) {
    super(props)

  }
  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Profile
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page1')}>
                Edit Profile
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.sectionHeadingStyle}>
              Groups
            </Text>
            <View style={styles.navSectionStyle}>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page2')}>
                Add New Group
              </Text>
              <Text style={styles.navItemStyle} onPress={this.navigateToScreen('Page3')}>
                Page3
              </Text>
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
                console.log('LOGOUT PRESSED', this.props)
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
};

export default SideMenu;