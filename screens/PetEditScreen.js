import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { withNavigation } from 'react-navigation';

import PetForm from '../components/PetForm';
import { petUpdate, petSave, petDelete } from '../actions';
import { Card, CardSection, Confirm, Button } from '../components/common';

class PetEditScreen extends Component {
	state = { showModal: false };

	componentWillMount() {
		_.each(this.props.pet, (value, prop) => {
			this.props.petUpdate({ prop, value });
		});
	}

	onButtonPress = () => {
		const { name, uid } = this.props.navigation.state.params;

		this.props.petSave({ name: this.props.name, uid });
		this.props.navigation.navigate('house');
	}

	onAccept() {
		const { uid } = this.props.navigation.state.params;

		this.props.petDelete({ uid });
		this.props.navigation.navigate('house');
	}

	onDecline() {
		this.setState({ showModal: false });
	}

	render() {
		const { navigation } = this.props;
		const { name, uid } = navigation.state.params;
		{console.log('PetEditScreen.js name: ', name, 'uid: ', uid)};

		return (
			<Card>
				<PetForm {...this.props}/>

				<CardSection>
					<Button onPress={this.onButtonPress}>
						Save Changes
					</Button>
				</CardSection>

				<CardSection>
					<Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
						Delete Pet
					</Button>
				</CardSection>

				<Confirm
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>
					Are you sure you want to delete this?
				</Confirm>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name } = state.petForm;

	return { name };
};

export default withNavigation(connect(mapStateToProps, {
	petUpdate, petSave, petDelete
})(PetEditScreen));
