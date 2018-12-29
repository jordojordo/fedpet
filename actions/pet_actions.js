import axios from 'axios';
import firebase from 'firebase';
import {
	PET_UPDATE,
	PET_AVATAR_UPDATE,
	PET_CREATE,
	PET_FEED_BREAKFAST,
	PET_FEED_DINNER,
	PETS_FETCH_SUCCESS,
	PET_SAVE_SUCCESS,
} from './types';

export const petUpdate = ({ prop, value, uid }) => {
	return {
		type: PET_UPDATE,
		payload: { prop, value }
	};
};

export const petAvatarUpdate = ({ prop, value, uid }) => {
	return { 
		type: PET_AVATAR_UPDATE,
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

export const petsFetch = () => async dispatch => {
	const { user } = await firebase.auth().onAuthStateChanged(user => {
		if (user != null) {
			firebase.database().ref(`/users/${user.uid}/pets`)
				.on("value", snapshot => {
					dispatch({ type: PETS_FETCH_SUCCESS, payload: snapshot.val() })
				});
		} else {
			console.log('error fetching');
		}
	});
};

export const petSave = ({ name, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.set({ name })
			.then(() => {
				dispatch({ type: PET_SAVE_SUCCESS });
			});
	};
};

export const petDelete = ({ uid }) => {
	const { currentUser } = firebase.auth();

	return () => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.remove()
	};
};

export const petFeedBreakfast = ({ fedBreakfast, uid }) => async dispatch => {
	const { user } = await firebase.auth().onAuthStateChanged(user => {
		if (user != null) {
			firebase.database().ref(`/users/${user.uid}/pets/${uid}`)
				.update({ fedBreakfast })
				.then(() => {
					dispatch({
						type: PET_FEED_BREAKFAST,
						payload: { prop: 'fedBreakfast', value: fedBreakfast } 
					});
				});
				console.log('pet_actions.js uid: ', uid);
		};
	});
};

export const petFeedDinner = ({ fedDinner, uid }) => {
	const { currentUser } = firebase.auth();

	return (dispatch) => {
		firebase.database().ref(`/users/${currentUser.uid}/pets/${uid}`)
			.update({ fedDinner })
			.then(() => {
				dispatch({ 
					type: PET_FEED_DINNER, 
					payload: { prop: 'fedDinner', value: fedDinner } });
			});
	};
};
