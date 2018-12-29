import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import { petUpdate, petAvatarUpdate, petCreate } from '../actions';
import { Card, CardSection, Button } from '../components/common';
import PetForm from '../components/PetForm';

class PetCreateScreen extends Component {
	onButtonPress = () => {
		const { name, fedBreakfast, fedDinner, currentIndex } = this.props;

		this.props.petCreate({ name, fedBreakfast, fedDinner, currentIndex });
		this.props.navigation.navigate('house');
	}

	render() {
		return (
			<View>
				<CardSection>
					<Button onPress={this.onButtonPress} style={styles.buttonContainer}>
						Create
					</Button>
				</CardSection>

				<PetForm {...this.props} />
			</View>
		);
	}
}

const styles = {
	container: {
		flexDirection: 'column',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonContainer: {
		alignSelf: 'center'
	}
}

const mapStateToProps = (state) => {
	const { name, fedBreakfast, fedDinner, currentIndex } = state.petForm;

	return { name, fedBreakfast, fedDinner, currentIndex };
};

export default withNavigation(connect(mapStateToProps, {
	petUpdate, petAvatarUpdate, petCreate
})(PetCreateScreen));
