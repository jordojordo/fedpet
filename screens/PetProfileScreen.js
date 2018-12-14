import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

class PetProfileScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Pet Profile',
		headerRight: (
			<Button
				title='Edit'
				onPress={() => navigation.navigate('edit')}
				backgroundColor="rgba(0,0,0,0)"
				color="rgba(0,122,255,1)"
			/>
		)
	});

	render() {
		return (
			<View style={styles}>
				<Text>PetProfileScreen</Text>
				<Text>PetProfileScreen</Text>
				<Text>PetProfileScreen</Text>
				<Text>PetProfileScreen</Text>
				<Text>PetProfileScreen</Text>				
			</View>
		);
	}
}

const styles = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
}

export default PetProfileScreen;
