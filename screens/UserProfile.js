import React from 'react'
import { TouchableOpacity, StyleSheet, Text, View, Image, ImageBackground, SectionList } from 'react-native'
import ToggleButton from '../components/ToggleButton'
import Dimensions from 'Dimensions'


export default class UserProfile extends React.Component {

state = {
 selection: 'PROFILE',
}

handlePressItem = (item) => {
    this.setState({ selection: item })
  }

render() {
  const {selection} = this.state
  return (
    <View style={styles.container}>
      <ImageBackground style={styles.image} source={require('../assets/images/Immune-System2.jpg')}>
        <Text style={styles.title}>ALLERT - G</Text>
        <ToggleButton
          items={['PROFILE','FAMILY','PARTY','PREFS']}
          value={selection}
          onPressItem={this.handlePressItem} />
      </ImageBackground>
    </View>
    )
  }
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	image: {
		height: null,
		width: DEVICE_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 30,
	},
	logo: {
		height: 40,
		width: 40,
		marginBottom: 10,
	},
	title: {
		backgroundColor: 'transparent',
		color: 'red',
		fontSize: 24,
		marginBottom: 10,
		fontWeight: '500',
	},
	list: {
		flex: 1,
	},
	sectionHeader: {
		backgroundColor: 'whitesmoke',
		padding: 20,
	},
	sectionHeaderText: {
		fontSize: 13,
	},
	row: {
		backgroundColor: 'white',
		padding: 20,
	},
	rowTitle: {
		fontSize: 13,
		fontWeight: '500',
	},
	rowSpeaker: {
		fontSize: 13,
	},
});
