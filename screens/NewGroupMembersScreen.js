import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getProfiles, getAllProfiles } from '../actions/profiles'
import { createParty } from '../actions/party'
import {
	ListView,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	View,
	ActivityIndicator,
	StatusBar,
	FlatList,
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'; // 0.4.6
import MemberSelect from '../components/MemberSelect'
import Swipeout from 'react-native-swipeout'
import { Header, Content, Button, CheckBox, List} from 'react-native-elements'
import Members from '../components/Members'
import 'prop-types'; // 15.6.0
import Dimensions from 'Dimensions';


const mapStateToProps = ({ profiles }) => ({ profiles })
const mapDispatchToProps = dispatch => bindActionCreators({ getProfiles, getAllProfiles, createParty }, dispatch);


class NewGroupMemberScreen extends React.Component {
	constructor(props) {
		super(props);
		const prevState = this.props.navigation.getParam('state');
		this.state = {
			...prevState,
			isLoaded: false,
			currentProfileId: '',
			allMembers: [],
			selectMembers: [],
			checkedMembers: [],
		};
	}

	async componentDidMount() {
		await this.props.getProfiles();
		await this.props.getAllProfiles();

		const currentProfileId = this.props.profiles.data[0].id;

		this.setState({
			navigate: this.props.navigation,
			allMembers: this.props.profiles.allProfiles,
			isLoaded: true,
			currentProfileId,
		});

		let members = this.formatMembersArray();
		this.setState({
			navigate: this.props.navigation,
			allMembers: members,
			isLoaded: true,
			currentProfileId,
		});
	}

	updateCheck = id => {
		let tempState = { ...this.state };

		tempState.allMembers.map(m => {
			if (m.id === id) {
				m.isChecked = !m.isChecked;
			}
			return m;
		})

		this.setState(tempState)
	};

	createIDArray =  () => {
		const memberSet = new Set();
		let tempState = { ...this.state };

		tempState.allMembers.map(m => {
			if (m.isChecked) memberSet.add(m.id);
		})

		memberSet.add(this.state.currentProfileId)
		tempState.selectMembers = [...memberSet]

		return tempState.selectMembers
	}

	formatMembersArray() {
		let result;
		let comp;
		let final = [];
		if (this.state.isLoaded) {
			result = this.state.allMembers.filter(i => i.id !== this.state.currentProfileId)
		}

		if (result) {
			comp = result.map(e => {
				final.push({
					id: e.id,
					name: `${e.first_name} ${e.last_name}`,
					isChecked: false,
				});
			});
		}

		
		return final;
	}

	render() {
		return (
			<View>
				<List>
					{this.state.allMembers.map(m => (
						<CheckBox
							key={m.id}
							center
							iconRight
							title={m.name}
							checkedIcon="dot-circle-o"
							uncheckedIcon="circle-o"
							checked={m.isChecked}
							onPress={() => {
								this.updateCheck(m.id);
						
							}}
						/>
					))}
				</List>

				<Button
					raised
					icon={{ name: 'cached' }}
					title="Create Group"
					backgroundColor={'blue'}
					onPress={() => {
						const checked = this.createIDArray()
						
						this.props.createParty({ name: this.state.groupName, membersArray: checked })
						this.props.navigation.navigate('Home')
					}}
				/>
			</View>
		);
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
})

export default connect(mapStateToProps, mapDispatchToProps)(NewGroupMemberScreen)
