import { combineReducers } from 'redux';

import * as actions from '../actions/comments';

export function list(state = [], action) {
	switch (action.type) {
		case actions.COMMENTS_ADD_ITEMS:
			return  action.payload.comments.Keys ? action.payload.comments.Keys : state;

		default:
			return state;
	}
}

export function counters(state = [], action) {
	switch (action.type) {
		case actions.COMMENTS_ADD_ITEMS:
			return  action.payload.counters ? action.payload.counters : state;

		default:
			return state;
	}
}
export function itemsTotalCount(state = 0, action) {
	switch (action.type) {
		case actions.COMMENTS_ADD_ITEMS:
			return  action.payload.comments.Paging.count;

		default:
			return state;
	}
}

export function page(state = 1, action) {
	switch (action.type) {
		case actions.COMMENTS_SET_PAGE:
			return  action.payload;

		default:
			return state;
	}
}

export function label(state = 'comments', action) {
	switch (action.type) {
		case actions.COMMENTS_SET_LABEL:
			return  action.payload;

		default:
			return state;
	}
}
export function edit(state = false, action) {
	switch (action.type) {
		case actions.COMMENTS_EDIT_ON:
			return action.payload;
			
		case actions.COMMENTS_EDIT_OFF:
			return false;

		default:
			return state;
	}
}

export const comments = combineReducers({
	list,
	counters,
	itemsTotalCount,
	page,
	label,
	edit,
});
