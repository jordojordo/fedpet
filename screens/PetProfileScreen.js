import _ from 'lodash';
import React, { Component } from 'react';
import { 
	View, 
	Text, 
	Button, 
	Image, 
	Switch, 
	TouchableOpacity 
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import PetForm from '../components/PetForm';
import { 
	petFeedBreakfast, 
	petFeedDinner, 
	petUpdate
} from '../actions';
import { Card, CardSection } from '../components/common';
import HouseholdScreen from './HouseholdScreen';
import images from '../assets/images';

const avatars = [
	images.cat,
	images.dog,
	images.bird,
	images.fish,
	images.pig,
	images.rabbit,
	images.turtle,
	images.unicorn,
	images.corgi
];

class PetProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Pet Profile',
		headerLeft: (
			<Button
				title='Back'
				onPress={() => navigation.navigate('house')}
				backgroundColor="rgba(0,0,0,0)"
				color="rgba(0,122,255,1)"
			/>
		),		
		// headerRight: (
		// 	<Button
		// 		title='Edit'
		// 		onPress={() => navigation.navigate('edit')}
		// 		backgroundColor="rgba(0,0,0,0)"
		// 		color="rgba(0,122,255,1)"
		// 	/>
		// )
	});

	componentWillMount() {
		_.each(this.props.pet, (value, prop) => {
			this.props.petUpdate({ prop, value });
		});
	}

	onBreakfastSwitchPress = value => {
		const { fedBreakfast, uid } = this.props.navigation.state.params;

		this.props.petFeedBreakfast({ 
			fedBreakfast: value, 
			uid
		});

		this.props.navigation.setParams({
			fedBreakfast: value
		});
	}

	onDinnerSwitchPress = value => {
		const { fedDinner, uid } = this.props.navigation.state.params;

		this.props.petFeedDinner({ 
			fedDinner: value, 
			uid
		});

		this.props.navigation.setParams({
			fedDinner: value
		});
	}

	onEditPress = () => {
		const { name, uid } = this.props.navigation.state.params;
		this.props.navigation.navigate('edit', {
			name,
			uid
		});
		console.log('onEditPress name: ', name, 'uid: ', uid);
	}

	render() {
		const { navigation } = this.props;
		const { name, uid, fedBreakfast, fedDinner, currentIndex } = navigation.state.params;

		return (
			<Card>
				<CardSection style={styles.profileStyle}>
					<TouchableOpacity onPress={this.onEditPress}>
						<View style={styles.profileStyle}>
							<Image 
								source={avatars[currentIndex]}
								style={styles.imageStyle} />
							<Text style={styles.cardText}>
								{name}
							</Text>
						</View>
					</TouchableOpacity>
				</CardSection>
				<CardSection style={styles.cardSectionStyle}>
					<Text style={styles.fedText}>
						Breakfast
					</Text>
					<Switch
						value={fedBreakfast}
						onValueChange={this.onBreakfastSwitchPress}
					>
					</Switch>
					<Text style={styles.fedText}>
						Dinner
					</Text>
					<Switch
						value={fedDinner}
						onValueChange={this.onDinnerSwitchPress}
					>
					</Switch>
				</CardSection>
			</Card>
		);
	}
}


const styles = {
	cardSectionStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	profileStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardText: {
		fontSize: 18,
		fontWeight: '500',
		paddingTop: 10,
		paddingBottom: 10
	},
	imageStyle: {
		width: 150,
		height: 150,
		borderRadius: 50
	},
	fedSwitches: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	}
}

const mapStateToProps = state => {
	const { name, fedBreakfast, fedDinner, uid } = state.petForm;

	return { name, fedBreakfast, fedDinner, uid };
}

export default withNavigation(connect(mapStateToProps, { 
	petUpdate,
	petFeedBreakfast,
	petFeedDinner 
})(PetProfileScreen));
