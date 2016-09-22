export const TOP_SET_KEYS = 'TOP_SET_KEYS';

export function setKeys(keys) {
	return {
		type: TOP_SET_KEYS,
		payload: keys,
	}
};
export const TOP_SET_USERS = 'TOP_SET_USERS';

export function setUsers(users) {
	return {
		type: TOP_SET_USERS,
		payload: users,
	}
};


