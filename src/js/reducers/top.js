import { combineReducers } from 'redux';

//import * as immutations from '../helpers/immutations';
import * as actions from '../actions/top';

export function keys(state = [], action) {
	switch (action.type) {
		case actions.TOP_SET_KEYS:
			return 	action.payload;
		
		default:
			return state;
	}
}

export function users(state = [], action) {
	switch (action.type) {
		case actions.TOP_SET_USERS:
			return 	action.payload;

		default:
			return state;
	}
}

export function fixed(state = false, action) {
	switch (action.type) {
		case actions.TOP_FIX:
			return 	true;
		case actions.TOP_UNFIX:
			return 	false;

		default:
			return state;
	}
}


export const top = combineReducers({
	keys,
	users,
	fixed,
});
