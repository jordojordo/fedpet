import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import * as Expo from 'expo';
import {
	GOOGLE_LOGIN_SUCCESS,
	GOOGLE_LOGIN_FAIL,
	CREATE_USER
} from './types';

import { ANDROID_CLIENT_ID, IOS_CLIENT_ID } from './ClientId';
import { GOOGLE_CLIENT_ID } from './GoogleClientId';

// How to use AsyncStorage:
// AsyncStorage.setItem('google_token', token);
// AsyncStorage.getItem('google_token');

const provider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = () => async dispatch => {
	let accessToken = await AsyncStorage.getItem('google_token');

	if (accessToken) {
		// Dispatch an action saying Google login is done
		dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
	} else {
		// Start up Google login process 
		signInWithGoogleAsync(dispatch);
	}
};

const signInWithGoogleAsync = async dispatch => {
	let { type, accessToken } = await Expo.Google.logInAsync({
		androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
    behavior: 'web'
	});

	try {
		if (type === 'success') {
			const credential = firebase.auth.GoogleAuthProvider.credential(null, accessToken);
			const { uid } = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
		}
	} catch(e) {
		console.error(e);
	}

	if (type === 'cancel') {
		return dispatch({ type: GOOGLE_LOGIN_FAIL });
	}

	await AsyncStorage.setItem('google_token', accessToken);
	dispatch({ type: GOOGLE_LOGIN_SUCCESS, payload: accessToken });
};
