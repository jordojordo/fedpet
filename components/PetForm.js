import React, { Component } from 'react';
import { 
	View, 
	Text, 
	Image, 
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import { petUpdate } from '../actions';
import { CardSection, Input, Card } from './common';
import Carousel from './Carousel';


class PetForm extends Component {
	render() {
		return (
			<View style={styles.formStyle}>
				<CardSection>
					<Input
						label="Name"
						placeholder="Cooper"
						value={this.props.name}
						onChangeText={value => this.props.petUpdate({ prop: 'name', value })}
					/>
				</CardSection>
				<View>
					<Carousel />
				</View>
				<CardSection style={styles.textStyle}>
					<Text>
						Swipe to choose an avatar!
					</Text>
				</CardSection>
			</View>
		);
	}
}

const styles = {
	formStyle: {
		position: 'absolute'
	},
	textStyle: {
		justifyContent: 'center',
		alignSelf: 'center',
	}
};


const mapStateToProps = (state) => {
	const { name } = state.petForm;

	return { name };
};

export default connect(mapStateToProps, { petUpdate })(PetForm);