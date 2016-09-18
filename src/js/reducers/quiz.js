import { combineReducers } from 'redux';

import * as actions from '../actions/quiz';

export function currentQuestion(state = 1, action) {
	switch (action.type) {
		case actions.QUIZ_SET_CURRENT_QUESTION:
			return 	action.payload;
		default:
			return state;
	}
}


export const quiz = combineReducers({
	currentQuestion,
});
