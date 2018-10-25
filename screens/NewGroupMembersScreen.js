import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getAllProfiles } from '../actions/profiles'
import {
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	ActivityIndicator,
	StatusBar,
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'; // 0.4.6
import MemberSelect from '../components/MemberSelect'
import Swipeout from 'react-native-swipeout'
import {Header, Button} from 'react-native-elements'
import 'prop-types'; // 15.6.0
import Dimensions from 'Dimensions';


const mapStateToProps = ({ profiles }) => ({ profiles });
const mapDispatchToProps = dispatch => bindActionCreators({ getAllProfiles }, dispatch);


class NewGroupMemberScreen extends React.Component {
	constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
		this.state = {
      isLoading: false,
			basic: true,
      listViewData: [],
			memArr: []
			
    }
    
  }
  
  async componentDidMount() {
    await this.props.getAllProfiles()
    this.setState({
      navigate: this.props.navigation,
      allMembers: this.props.profiles.allProfiles
    })
    if(this.props.profiles.allProfiles === undefined) {
			this.setState({isLoading: true})
			await this.props.getAllProfiles()
    } else {
      this.checkLoading()
    }
  } 

  
  checkLoading = () => {
		var testArray = [] 
		this.setState({isLoading:true})
		this.state.isLoading ? <ActivityIndicator /> :
		setTimeout(() => this.setState({
    listViewData: this.props.profiles.allProfiles
			.map((m, i) => {	console.log('BOOM', m.first_name)
				memArr.push({ name: `${m.first_name} ${m.last_name}`, index: i, closeOnRowPress:false})
											}
					),
		listViewKeys: this.props.profiles.allProfiles
			.map((_,i) =>  i)
			 
	}), 2000)
		
		this.setState({isLoading: false})
}


	render() {
		if(this.state.isLoading) {
			return <ActivityIndicator /> 
		}
		let dataArr = []
		this.props.profiles.allProfiles.map((m, i) => dataArr.push({ name: `${m.first_name} ${m.last_name}`, index: i, closeOnRowPress: false }))
			
		console.log('YAHOOOOO', dataArr)

		

		return (
		
			<View style={styles.container}>
								
				 	<SwipeListView
					closeOnRowPress={false}
					closeOnScroll={false}
					closeOnRowBeginSwipe={false}
			 		useFlatList={true}
			 		data={dataArr}
			 		keyExtractor={item=>item.index}
			 		renderItem={(rowData, rowMap) => (

			 				<View style={styles.rowFront}>
			 					<Text>{rowData.item.name}</Text>
			 				</View>
			 		)}
			 		renderHiddenItem={(rowData, rowMap) => (

			 				<View style={styles.rowBack}>
			 					<Text></Text>
			 					<Text>+ To Group</Text>
			 				</View>

			 		)}
			 		leftOpenValue={5}
			 		rightOpenValue={-75}
			 		onRowOpen={(rowKey, rowMap) => {
			 			console.log('HERE',	rowKey)
			 		}}
			 	/>




			</View>
		)

		
		
		
		

		// return (
		// 	<SwipeListView
		// 		useFlatList={true}
		// 		data={this.state.memArr}
		// 		keyExtractor={item=>item.name}
		// 		renderItem={(rowData, rowMap) => (
				
		// 				<View style={styles.rowFront}>
		// 					<Text>{rowData.item.name}</Text>
		// 				</View>
		// 		)}
		// 		renderHiddenItem={(rowData, rowMap) => (
				
		// 				<View style={styles.rowBack}>
		// 					<Text></Text>
		// 					<Text>+ To Group</Text>
		// 				</View>
				
		// 		)}
		// 		leftOpenValue={5}
		// 		rightOpenValue={-75}
		// 		onRowOpen={(rowKey, rowMap) => {
		// 			console.log('HERE',	rowKey)
		// 		}}
		// 	/>
		// )
		}
}
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window');
let box_count = 3;
let box_height = DEVICE_HEIGHT / box_count;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',

		backgroundColor: '#8bc34a',
	},
	button: {
		backgroundColor: 'purple',
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		borderRadius: 15,
	},
	box: {
		height: box_height,
		justifyContent: 'center',
	},
	box1: {
		flex: 2,
		backgroundColor: '#8bc34a',
		alignItems: 'center',
	},
	box2: {
		flex: 7,
		backgroundColor: '#8bc34a',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	box3: {
		flex: 6,
		backgroundColor: '#8bc34a',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 30,
	},
	titleText: {
		color: 'black',
		fontSize: 60,
		fontFamily: 'Oswald-Heavy',
	},
	formLabel: {
		backgroundColor: 'black',
		marginLeft: 20,
		marginRight: 20,
	},
	formInput: {
		//paddingRight: 20,
		backgroundColor: '#e0e0eb',
		marginLeft: 20,
		marginRight: 20,
	},
	signin: {
		backgroundColor: 'black',
		borderWidth: 1,
		borderRadius: 20,
		borderColor: 'black'
	},
	newUser: {
		backgroundColor: 'red',
		borderRadius: 20,
		color: 'green',
	},
	standalone: {
		marginTop: 30,
		marginBottom: 30,
	},
	standaloneRowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		justifyContent: 'center',
		height: 50,
	},
	standaloneRowBack: {
		alignItems: 'center',
		backgroundColor: '#8BC645',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 15,
	},
	backTextWhite: {
		color: '#FFF',
	},
	rowFront: {
		alignItems: 'center',
		backgroundColor: '#CCC',
		borderBottomColor: 'black',
		borderBottomWidth: 1,
		justifyContent: 'center',
		height: 50,
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#009688',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		paddingLeft: 5,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 75,
	},
	backRightBtnRight: {
		backgroundColor: 'red',
		right: 0,
	},
	controls: {
		alignItems: 'center',
		marginBottom: 30,
	},
	switchContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginBottom: 5,
	},
	switch: {
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'black',
		paddingVertical: 10,
		width: 100,
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupMemberScreen)
