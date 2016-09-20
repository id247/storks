export const COMMENTS_ADD_ITEMS 		= 'COMMENTS_ADD_ITEMS';

export function addItems(payload) {
	return{
		type: COMMENTS_ADD_ITEMS,
		payload: payload
	}
};

export const COMMENTS_EDIT_ON 	= 'COMMENTS_EDIT_ON';
export const COMMENTS_EDIT_OFF 	= 'COMMENTS_EDIT_OFF';

export function editOn(commentId) {
	return {
		type: COMMENTS_EDIT_ON,
		payload: commentId
	}
}

export function editOff() {
	return {
		type: COMMENTS_EDIT_OFF,
	}
}


export const COMMENTS_SET_PAGE 	= 'COMMENTS_SET_PAGE';

export function setPage(pageId) {
	return {
		type: COMMENTS_SET_PAGE,
		payload: pageId
	}
}

export const COMMENTS_SET_LABEL 	= 'COMMENTS_SET_LABEL';

export function setLabel(label) {
	return {
		type: COMMENTS_SET_LABEL,
		payload: label
	}
}
