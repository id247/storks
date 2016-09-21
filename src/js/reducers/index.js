import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';
import { results } from './results';
import { comments } from './comments';
import { commentsForm } from './comments-form';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
	results,
	comments,
	commentsForm,
});

export default rootReducer;
