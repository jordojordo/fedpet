import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Dimensions, Text } from 'react-native';
import { connect } from 'react-redux';
import SideSwipe from 'react-native-sideswipe';
import { withNavigation } from 'react-navigation';

import { petAvatarUpdate } from '../actions';
import { Avatar } from './CarouselIndex';

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
			</View>
		);
	}
}

const styles = {
	avatarContainer: {
		borderBottomWidth: 1,
		borderRadius: 2,
		borderColor: '#ddd',
		borderBottom: 0,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
		marginTop: 10,
		paddingBottom: 10,
		justifyContent: 'flex-start',
		flexDirection: 'row',
		position: 'relative'
	},
	fill: {
		paddingTop: 0,
		marginTop: 0,
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
};

export default connect(null, { petAvatarUpdate })(Carousel);
