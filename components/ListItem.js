import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { withNavigation, NavigationActions } from 'react-navigation';

import { CardSection } from './common';
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


class ListItem extends Component {
 	onRowPress = () => {
 		const { navigation } = this.props;
 		navigation.navigate('profile', { 
 			name: this.props.pet.name, 
 			uid: this.props.pet.uid,
 			fedBreakfast: this.props.pet.fedBreakfast,
 			fedDinner: this.props.pet.fedDinner,
 			currentIndex: this.props.pet.currentIndex
 		});
 	}

	render() {
		const { name, currentIndex } = this.props.pet;

		return (
			<TouchableOpacity onPress={this.onRowPress}>
				<View>
					<CardSection style={styles.cardStyle}>
						<Image 
							source={avatars[currentIndex]}
							style={styles.imageStyle} />
						<Text style={styles.titleStyle}>
							{name}
						</Text>
					</CardSection>
				</View>
			</TouchableOpacity>			
		);
	}
}

const styles = {
	cardStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10
	},
	titleStyle: {
		fontSize: 18
	},
	imageStyle: {
		width: 100,
		height: 100,
		borderRadius: 50
	}
};

export default withNavigation(ListItem);