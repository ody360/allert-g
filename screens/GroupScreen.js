import React from 'react'
import { ART, ActivityIndicator, StyleSheet, View, Text, StatusBar} from 'react-native'
import { Container, Header, Content, Accordion, Title, Subtitle, Left, Body,Right, } from "native-base"
import { getParty, getMembers, getMembersId } from '../actions/party'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Dimensions from 'Dimensions'
import * as d3 from 'd3'
import {PieChart} from 'react-native-chart-kit'


const mapStateToProps = ({party})  => ({party})
const mapDispatchToProps = dispatch => bindActionCreators({ getParty, getMembers, getMembersId}, dispatch)

const {Surface, Group, Shape } = ART

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window');
const width = 250;
const height = 250;

let box_count = 3;
let box_height = DEVICE_HEIGHT / box_count;

class GroupScreen extends React.Component { 
	constructor(props) {
		super(props)
		const partyId = this.props.navigation.getParam('partyId')
		this.props.getMembers(partyId)
    this.state = {
      allergyCount :[]
    }
  }

	async componentDidMount() {
		await this.props.getParty()
		
	}

	static navigationOptions = {
		header: null,
	}

	render() {
		let dataArr = []
		let finalCount = []
		let allergyCounts = {}
		if (this.props.party.memId === undefined) {
			return <ActivityIndicator />;
		}
		const info = this.props.party.memId.map(e => {
			let name = `${e.first_name} ${e.last_name}`
			let temp = {}
			
			temp.title = name;
			temp.content = `\tAllergies: ${e.allergies.toString()}, \n\tMedication: ${e.medication}
     \n\tMedical History: ${e.medhx}`
      dataArr.push(temp)
			
      e.allergies.map((a)=> {
				allergyCounts[a] = allergyCounts[a] ? allergyCounts[a] + 1 : 1;
			})
			
		})

		// const colors = d3
		// 	.scaleLinear()
		// 	.domain([0, finalCount.length])
		// 	.range(["pink", "green","blue"]);

		
		for(let i in allergyCounts) {
			finalCount.push({
				name: i,
				count: allergyCounts[i],
				color: 'red',
				legendFontColor: '#2D1059',
				legendFontSize: 16
			});
		}

		const colors = d3
			.scaleLinear()
			.domain([0, finalCount.length])
			.range(['pink', 'brown']);


		for(let i=0; i < finalCount.length; i++) {
			finalCount[i].color=colors(i)
		}

		const sectionAngles = d3.pie().value(d => d.count)(finalCount);
		const labelAngles = d3.pie().value(d=> d.type)(finalCount)
		const path = d3.arc()
			.outerRadius(100) //must be less than 1/2 the chart's height/width
			.padAngle(.05) //defines the amount of whitespace between sections
			.innerRadius(60) //the size of the inner 'donut' whitespace
			


		const labelArc = d3.arc()
			.outerRadius(70) //must be less than 1/2 the chart's height/width
			.padAngle(.05) //defines the amount of whitespace between sections
			.innerRadius(30) //the size of the inner 'donut' whitespace

		

		let labels = []
		sectionAngles.map(sec => {
			labels.push(path.centroid(sec))

		})

		labelAngles.map((sec => {
				let c = labelArc.centroid(sec)
				labelArc.context(sec.data.type, c[0], c[1])
			}
		
		))


		const chartConfig = { backgroundGradientFrom: '#1E2923', backgroundGradientTo: '#08130D', color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})` };
		
		return <View style={styles.container}>
				<StatusBar hidden />
				<View style={[styles.box, styles.box1]}>
					<Text style={styles.titleText}>ALLERT-G</Text>
				</View>
				<View style={[styles.box, styles.box2]}>
					<Accordion dataArray={dataArr} expanded={0} headerStyle={[{ backgroundColor: '#b7daf8' }, { width: DEVICE_WIDTH - 20 }]} contentStyle={{ backgroundColor: '#ddecf8' }} />
				</View>
				<View style={[styles.box, styles.box3]}>
				
						<PieChart
							data={finalCount}
							width={DEVICE_WIDTH}
							height={220}
							chartConfig={chartConfig}
							accessor="count"
							backgroundColor="transparent"
							paddingRight="25"
							paddingLeft="15"
						/>
            
           
					
				</View>
			</View>
	}


}


export default connect(mapStateToProps, mapDispatchToProps)(GroupScreen)


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
    backgroundColor: '#009688',
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
    backgroundColor: '#009688',
		alignItems: 'center',
	},
	box2: {
		flex: 7,
    backgroundColor: '#009688',
    justifyContent: 'flex-start',
		alignItems: 'center',
  },
  accordion: {
    width: DEVICE_WIDTH,
  },
	box3: {
		flex: 6,
    backgroundColor: '#009688',
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
		borderColor: 'black',
	},
	newUser: {
		backgroundColor: 'red',
		borderRadius: 20,
		color: 'green',
	},
});