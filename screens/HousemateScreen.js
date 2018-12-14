import React, { Component } from 'react';
import { View, Text } from 'react-native';

class HousemateScreen extends Component {
	render() {
		return (
			<View style={styles}>
				<Text>HousemateScreen</Text>
				<Text>HousemateScreen</Text>
				<Text>HousemateScreen</Text>
				<Text>HousemateScreen</Text>
				<Text>HousemateScreen</Text>				
			</View>
		);
	}
}

const styles = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
}

export default HousemateScreen;
