import { combineReducers } from 'redux';

//import * as immutations from '../helpers/immutations';
import * as actions from '../actions/top';

export function keys(state = [], action) {
	switch (action.type) {
		case actions.TOP_SET_KEYS:
			return 	action.payload;

		//case actions.RESULTS_SET_QUIZ_DATA:
			//return 	action.payload.points;
		
		default:
			return state;
	}
}

export function users(state = [], action) {
	switch (action.type) {
		case actions.TOP_SET_USERS:
			return 	action.payload;

		//case actions.RESULTS_SET_QUIZ_DATA:
			//return 	action.payload.time;
		default:
			return state;
	}
}


export const top = combineReducers({
	keys,
	users,
});
