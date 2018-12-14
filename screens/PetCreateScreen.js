import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { petUpdate, petCreate } from '../actions';
import { Card, CardSection, Button } from '../components/common';
import PetForm from '../components/PetForm';

class PetCreateScreen extends Component {
	onButtonPress = () => {
		const { name, fedBreakfast, fedDinner } = this.props;

		this.props.petCreate({ name, fedBreakfast, fedDinner });
	}

	render() {
		return (
			<Card>
				<PetForm {...this.props} />
				<CardSection>
					<Button onPress={this.onButtonPress}>
						Create
					</Button>
				</CardSection>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, fedBreakfast, fedDinner } = state.petForm;

	return { name, fedBreakfast, fedDinner };
};

export default connect(mapStateToProps, {
	petUpdate, petCreate
})(PetCreateScreen);
