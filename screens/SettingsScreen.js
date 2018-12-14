import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingsScreen extends Component {
	render() {
		return (
			<View style={styles}>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>
				<Text>SettingsScreen</Text>				
			</View>
		);
	}
}

const styles = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
}

export default SettingsScreen;
