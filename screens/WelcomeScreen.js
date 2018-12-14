import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage, ActivityIndicator } from 'react-native';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Slides from '../components/Slides';

const SLIDE_DATA = [
	{ text: 'Welcome to PetFed App!', color: '#9A7DFF' },
	{ text: 'Use this to track if your pet has been fed', color: '#FFB66C' },
	{ text: 'Add your house/room mates, or whoever might feed your pet', color: '#BAA6FF' }
];

class WelcomeScreen extends Component {
	state = { accessToken: null } 

	async componentWillMount() {
    let accessToken = await AsyncStorage.getItem('google_token');

    if (accessToken) {
      this.props.navigation.navigate('house');
      this.setState({ accessToken });
    } else {
      this.setState({ accessToken: false });
    }
  }

	onSlidesComplete = ({ navigation }) => {
		this.props.navigation.navigate('auth');
	}

	render() {
		if (_.isNull(this.state.accessToken) && Platform.OS === 'ios') {
			return <AppLoading></AppLoading>;
		} else if (_.isNull(this.state.accessToken) && Platform.OS === 'android') {
			return <ActivityIndicator
				size='large'
				style={styles}
			/>;
		}
		
		return (
			<Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
		);
	}
}

const styles = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
}

export default WelcomeScreen;
