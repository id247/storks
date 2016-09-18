import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';
import { quiz } from './quiz';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
	quiz,
});

export default rootReducer;
