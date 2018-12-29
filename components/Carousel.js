import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import SideSwipe from 'react-native-sideswipe';
import { withNavigation } from 'react-navigation';

import { petAvatarUpdate } from '../actions';
import { Avatar } from './CarouselIndex';
import { CardSection, Input } from './common';


const { width } = Dimensions.get('window');

const avatars = [
	{ title: 'Cat', value: 'cat' },
	{ title: 'Dog', value: 'dog' },
	{ title: 'Bird', value: 'bird' },
	{ title: 'Fish', value: 'fish' },
	{ title: 'Pig', value: 'pig' },
	{ title: 'Rabbit', value: 'rabbit' },
	{ title: 'Turtle', value: 'turtle' },
	{ title: 'Unicorn', value: 'unicorn' },
	{ title: 'Corgi', value: 'corgi' },
];

class Carousel extends Component {
	state = {
		currentIndex: 0,
	};

	render() {
		const offset = (width - Avatar.WIDTH) / 2;

		return (
			<View style={styles.avatarContainer}>
				<SideSwipe
					data={avatars}
					shouldCapture={() => true}
					style={[styles.fill, { width }]}
					contentContainerStyle={{ paddingTop: 10 }}
					itemWidth={Avatar.WIDTH}
					threshold={Avatar.WIDTH / 4}
					extractKey={item => item.value}
					contentOffset={offset}
					onIndexChange={index => 
						this.props.petAvatarUpdate({ prop: 'currentIndex', value: index })}
					renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
						<Avatar
							avatar={item}
							index={itemIndex}
							currentIndex={currentIndex}
							animatedValue={animatedValue}
						/>
					)}
				/>
				<Text style={styles.textStyle}>
					Swipe to choose an avatar!
				</Text>
			</View>
		);
	}
}

const styles = {
	avatarContainer: {
		position: 'absolute',
		marginTop: 10
	},
	fill: {
		paddingTop: 0,
		marginTop: 0,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	textStyle: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'center',
		marginVertical: 10
	}
};

export default connect(null, { petAvatarUpdate })(Carousel);
