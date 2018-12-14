import axios from 'axios';
import firebase from 'firebase';
import {
	PET_UPDATE,
	PET_CREATE,
	PET_FEED_BREAKFAST,
	PET_FEED_DINNER,
	PETS_FETCH_SUCCESS,
	PET_SAVE_SUCCESS
} from './types';

export const petUpdate = ({ prop, value, uid }) => {
	return {
		type: PET_UPDATE,
		payload: { prop, value }
	};
};

export const petCreate = ({ name, fedBreakfast, fedDinner }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets`)
		.push({ name, fedBreakfast, fedDinner })
		.then(() => {
			dispatch({ type: PET_CREATE });
		});
	};
};