import { combineReducers } from 'redux';

import * as actions from '../actions/comments-form';

export function message(state = '', action) {
	switch (action.type) {
		case actions.COMMENTS_FORM_CHANGE:
			return 	action.payload.message;

		case actions.COMMENTS_FORM_MESSAGE_CLEAR:
			return 	'';

		default:
			return state;
	}
}
export function anon(state = false, action) {
	switch (action.type) {
		case actions.COMMENTS_FORM_CHANGE:
			return 	action.payload.anon;

		default:
			return state;
	}
}

export function quote(state = false, action) {
	switch (action.type) {
		case actions.COMMENTS_FORM_ADD_QUOTE:
			return  action.payload;

		case actions.COMMENTS_FORM_DELETE_QUOTE:
			return  false;

		default:
			return state;
	}
}
export function commentAdded(state = false, action) {
	switch (action.type) {
		case actions.COMMENTS_FORM_COMMENT_ADDED:
			return  true;

		case actions.COMMENTS_FORM_COMMENT_NOT_ADDED:
			return  false;

		default:
			return state;
	}
}

export const commentsForm = combineReducers({
	message,
	anon,
	quote,
	commentAdded,
});
