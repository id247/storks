import { combineReducers } from 'redux';

import * as immutations from '../helpers/immutations';
import * as actions from '../actions/results';

export function quizPoints(state = 0, action) {
	switch (action.type) {
		case actions.RESULTS_SET_ALL_DATA:
			return 	action.payload.quizPoints ? action.payload.quizPoints : state;

		case actions.RESULTS_SET_QUIZ_DATA:
			return 	action.payload.points;
		
		default:
			return state;
	}
}

export function quizTime(state = 0, action) {
	switch (action.type) {
		case actions.RESULTS_SET_ALL_DATA:
			return 	action.payload.quizTime ? action.payload.quizTime : state;

		case actions.RESULTS_SET_QUIZ_DATA:
			return 	action.payload.time;
		default:
			return state;
	}
}
export function gamePoints(state = 0, action) {
	switch (action.type) {
		case actions.RESULTS_SET_ALL_DATA:
			return 	action.payload.gamePoints ? action.payload.gamePoints : state;

		case actions.RESULTS_SET_GAME_DATA:
			return 	action.payload.points;;
		default:
			return state;
	}
}


export function gameTime(state = 0, action) {
	switch (action.type) {
		case actions.RESULTS_SET_ALL_DATA:
			return 	action.payload.gameTime ? action.payload.gameTime : state;

		case actions.RESULTS_SET_GAME_DATA:
			return 	action.payload.time;
		default:
			return state;
	}
}


export function friendsIds(state = [], action) {
	switch (action.type) {
		case actions.RESULTS_SET_ALL_DATA:
			return 	action.payload.friendsIds ? action.payload.friendsIds : state;

		case actions.RESULTS_ADD_FRIEND_ID:
			return 	immutations.addToArray(state, action.payload);
		default:
			return state;
	}
}


export const results = combineReducers({
	quizPoints,
	quizTime,
	gamePoints,
	gameTime,
	friendsIds,
});
