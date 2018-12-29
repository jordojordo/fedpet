import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import images from '../assets/images';

const { width: screenWidth } = Dimensions.get('window');
const width = screenWidth - 300;

export class Avatar extends Component {
	static WIDTH = width;

	render = () => {
		const { animatedValue, avatar, index } = this.props;
		
		return (
			<Animated.View style={styles.container}>
				<Animated.Image
					style={[
						styles.avatar,
						{
							transform: [
								{
									scale: animatedValue.interpolate({
										inputRange: [index -1, index, index + 1],
										outputRange: [1, 1.6, 1],
										extrapolate: 'clamp'
									}),
								},
								{
									rotate: animatedValue.interpolate({
										inputRange: [index -1, index, index + 1],
										outputRange: ['-90deg', '0deg', '90deg'],
										extrapolate: 'clamp'
									}),
								},
							],
						},
					]}
					source={images[avatar.value]}
				/>
			</Animated.View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		width: width,
		height: width,
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: Platform.select({
		ios: {
			width: width - 25,
			height: width - 25,
		},
		android: {
			width: width - 50,
			height: width - 50,
		},
	}),
});




