import { combineReducers } from 'redux';

import { error } from './error';
import { user } from './user';
import { loading } from './loading';
import { page } from './page';
import { results } from './results';
import { top } from './top';
import { comments } from './comments';
import { commentsForm } from './comments-form';

const rootReducer = combineReducers({
	error,
	loading,
	user,
	page,
	results,
	top,
	comments,
	commentsForm,
});

export default rootReducer;
