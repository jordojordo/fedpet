import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';

import { petUpdate } from '../actions';
import { CardSection, Input } from './common';

class PetForm extends Component {
	onImagePress = async () => {
		const { Permissions } = Expo;
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (status) {
			let result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [4:3],
				quality: 5
			});

			if (!result.cancelled) {
				this.uploadImage(result.uri)
					.then(() => {
						console.log('image uploaded');
					});
			}
		}
	}

	uploadImage = async (uri, imageName) => {
		const response = await fetch(uri);
		const blob = await response.blob();

		const ref = firebase.storage().ref().child("images/" + imageName);
		ref.getDownloadURL()
			.then((url) => console.log(url));
		return ref.put(blob);
	}

	render() {
		return (
			<View style={styles.viewStyle}>
				<TouchableOpacity onPress={this.onImagePress}>
					<View style={styles.cardStyle}>
						<Image 
								source={{uri: 'https://facebook.github.io/react/logo-og.png'}}
								style={styles.imageStyle} 
						/>
						<Text style={styles.imageText}>
							Upload a photo!
						</Text>
					</View>
				</TouchableOpacity>
				<CardSection>
					<Input
						label="Name"
						placeholder="Cooper"
						value={this.props.name}
						onChangeText={value => this.props.petUpdate({ prop: 'name', value })}
					/>
				</CardSection>
			</View>
		);
	}
}

const styles = {
	pickerLabelStyle: {
		fontSize: 18,
		paddingLeft: 20
	},
	cardStyle: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10
	},
	imageStyle: {
		width: 100,
		height: 100,
		borderRadius: 50
	},
	imageText: {
		marginTop: 10
	}
};

const mapStateToProps = (state) => {
	const { name } = state.petForm;

	return { name };
};

export default connect(mapStateToProps, { petUpdate })(PetForm);