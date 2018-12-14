import { 
	GOOGLE_LOGIN_SUCCESS,
	GOOGLE_LOGIN_FAIL 
} from '../actions/types';

export default function(state = {}, action) {
	switch (action.type) {
		case GOOGLE_LOGIN_SUCCESS:
			return { accessToken: action.payload };
		case GOOGLE_LOGIN_FAIL:
			return { accessToken: null };
		default:
			return state;
	}
}
