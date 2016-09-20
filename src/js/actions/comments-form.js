export const COMMENTS_FORM_CHANGE 	= 'COMMENTS_FORM_CHANGE';
export const COMMENTS_FORM_MESSAGE_CLEAR = 'COMMENTS_FORM_MESSAGE_CLEAR';

export function formChange(payload) {
	return{
		type: COMMENTS_FORM_CHANGE,
		payload: payload
	}
};

export function messageClear(payload) {
	return{
		type: COMMENTS_FORM_MESSAGE_CLEAR,
	}
};

export const COMMENTS_FORM_ADD_QUOTE = 'COMMENTS_FORM_ADD_QUOTE';
export const COMMENTS_FORM_DELETE_QUOTE = 'COMMENTS_FORM_DELETE_QUOTE';

export function addQuote(quote) {
	return {
		type: COMMENTS_FORM_ADD_QUOTE,
		payload: quote
	}
}
export function deleteQuote(quote) {
	return {
		type: COMMENTS_FORM_DELETE_QUOTE,
	}
}
export const COMMENTS_FORM_COMMENT_ADDED 		= 'COMMENTS_FORM_COMMENT_ADDED';
export const COMMENTS_FORM_COMMENT_NOT_ADDED	= 'COMMENTS_FORM_COMMENT_NOT_ADDED';

export function commentAdded() {
	return {
		type: COMMENTS_FORM_COMMENT_ADDED,
	}
}
export function commentNotAdded() {
	return {
		type: COMMENTS_FORM_COMMENT_NOT_ADDED,
	}
}
