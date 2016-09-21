export const RESULTS_SET_ALL_DATA = 'RESULTS_SET_ALL_DATA';

export function setAllData(results) {
	return {
		type: RESULTS_SET_ALL_DATA,
		payload: results,
	}
};

export const RESULTS_SET_QUIZ_DATA = 'RESULTS_SET_QUIZ_DATA';

export function setQuizData(data) {
	return {
		type: RESULTS_SET_QUIZ_DATA,
		payload: data,
	}
};


export const RESULTS_SET_GAME_DATA = 'RESULTS_SET_GAME_DATA';

export function setGameData(data) {
	return {
		type: RESULTS_SET_GAME_DATA,
		payload: data,
	}
};


export const RESULTS_ADD_FRIEND_ID = 'RESULTS_ADD_FRIEND_ID';

export function addFriendId(friendId) {
	return {
		type: RESULTS_ADD_FRIEND_ID,
		payload: friendId,
	}
};

