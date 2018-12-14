import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class HouseholdScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Household',
		headerRight: (
			<Button
				title='Add Pet'
				onPress={() => navigation.navigate('create')}
				backgroundColor="rgba(0,0,0,0)"
				color="rgba(0,122,255,1)"
			/>
		)
	});

	render() {
		return (
			<View style={styles}>
				<Text>HouseholdScreen</Text>
				<Text>HouseholdScreen</Text>
				<Text>HouseholdScreen</Text>
				<Text>HouseholdScreen</Text>
				<Text>HouseholdScreen</Text>				
			</View>
		);
	}
}

const styles = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
}

export default HouseholdScreen;
