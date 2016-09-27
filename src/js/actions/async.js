import API from '../api/api';
import OAuth from '../api/hello';

import { HTMLencode, HTMLdecode } from '../helpers/escape';

import { CommentsOptions, PromoOptions } from 'appSettings';

import * as visual from '../helpers/visual';
//import * as sort from '../helpers/sort';

import * as loadingActions 		from '../actions/loading';
import * as errorActions 		from '../actions/error';
import * as userActions 		from '../actions/user';
import * as pageActions 		from '../actions/page';
import * as resultsActions 		from '../actions/results';
import * as topActions 			from '../actions/top';

import * as commentsActions 	from '../actions/comments';
import * as commentsFormActions from '../actions/comments-form';


//error handler

export function catchError(err){
	return dispatch => {
		
		let errorStart = 'Ошибка ' + err.message + ':';
		let errorEnd = 'Попробуйте обновить страницу.';

		if (!err.description) {
			console.error(errorStart + ' ' + err);			
			dispatch(errorActions.setError(errorStart + err + errorEnd));
			return;
		}

		let description = err.description;

		if (err.description.type && err.description.description){

			description = err.description.type + ' (' + err.description.description + ')'; 

		}

		console.error(errorStart + ' ' + description);

		switch (err.message){
			case 401:					
				dispatch(logout());
				return;
				
				break;
			case 403: 
				errorEnd = 'Отказано в доступе.'
				
				break;
			case 404: 
				errorEnd = 'Запрошеный ресурс не найден.'
				
				break;
		}

		dispatch(errorActions.setError(errorStart + ' ' + description + ' ' + errorEnd));
	
	}
}


//chunk arrays and send in to getPromisesFunc function wich returns a Promise or array of Promises
function getChunkPromises(items, chunkLength = 10, getPromisesFunc){

	function isIterable(obj) {
		// checks for null and undefined
		if (obj == null) {
		return false;
		}
		return typeof obj[Symbol.iterator] === 'function';
	}

	function flatArrays(arrays){
		return [].concat.apply([], arrays);
	}

	function getChunks(items, chunkLength = 10){

		const chunks = [];

		for (let i = 0; i < items.length ; i+=chunkLength){
			chunks.push(items.slice(i,i+chunkLength));
		}

		return chunks;
	}

	return new Promise( (resolve, reject) => {

		let count = 0;
		const results = [];
		const itemsChunks = getChunks(items, chunkLength);

		itemsChunks.map( itemsChunk => {
			count++;

			setTimeout(() => {

				let promises = getPromisesFunc(itemsChunk); 

				console.log('send chunk');

				//in single Promise - push in to array for Promise.all
				if (!isIterable(promises)){
					promises = [promises];
				}

				Promise.all(promises)
				.then( values => {
					results.push(values);

					if (results.length === count){
						resolve( flatArrays(results) );
					}
				})
				.catch( err => {
					reject( err );
				});


			}, count*500);
		});
	});
}


// authorisation

export function login(pageAfterLogin = '/') {
	return dispatch => {
		dispatch(loadingActions.loadingShow());
		
		return OAuth.login()
		.then( () => {
			dispatch(loadingActions.loadingHide());	

			dispatch(getInitialData(pageAfterLogin));
		},(err) => {
			dispatch(loadingActions.loadingHide());	

			//dispatch(catchError(err));
		});
	}
}


export function logout() {
	return dispatch => {
		OAuth.logout();
		dispatch(userActions.userUnset());
		dispatch(pageActions.setPageWithoutHistory('/'));
	}
}

//friends
//



export function getFriends() {
	return dispatch => {

		dispatch(loadingActions.loadingShow());	
		
		API.getUserFriendsIds()
		.then( friendsIds => {

			dispatch(userActions.userFriendsIdsSet(friendsIds));
			return API.getUsers(friendsIds);
		})
		.then( friends => {
			dispatch(loadingActions.loadingHide());
			dispatch(userActions.userFriendsSet(friends));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


//stockers


export function sendSticker(stickerId, friendId) {
	return dispatch => {

		if (!stickerId || !friendId){
			return false;
		}

		dispatch(loadingActions.loadingShow());	

		const badge = {
			imageUrl: PromoOptions.cdn + 'images/stickers/' + stickerId + '.png',
			redirectUrl: PromoOptions.url,
			//text: 'Подпись',
		}
		
		API.postStickerToWall(friendId, badge)
		.then( res => {

			dispatch(loadingActions.loadingHide());
			console.log(res);

			if (res === 'ok'){
				dispatch(resultsActions.addFriendId(friendId));
				dispatch(sendResultsToDB());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


// results



export function getUserResults() {
	return (dispatch, getState) => {

		const userId = getState().user.profile.id;

		if (!userId){
			return false;
		}
		
		dispatch(loadingActions.loadingShow());	

		return API.getKeyFromDB('results-' + userId)
		.then( results => {
			dispatch(loadingActions.loadingHide());
			console.log(results);

			try{
				const data = JSON.parse(HTMLdecode(results.Value));	

				console.log(data);

				dispatch(resultsActions.setAllData(data));
			}catch(e){
				console.log(e);
			}

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			//not exists yet, its ok
			if (err.message && err.message === 404){
				return;
			}

			dispatch(catchError(err)); 
		});

	}
}


export function getAllResults() {
	return (dispatch, getState) => {

		dispatch(loadingActions.loadingShow());	

		return API.getKeyFromDB('total-result')
		.then( totalResult => {
			dispatch(loadingActions.loadingHide());

			dispatch(getAllSavedResults(totalResult));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());	
			
			if (err.message === 404){
				dispatch(getAllRealResults());
			}else{
				dispatch(catchError(err)); 				
			}
		});

	}
}

export function getAllRealResults() {
	return (dispatch, getState) => {

		dispatch(loadingActions.loadingShow());	

		let firstPageResults;

		const keysPageSize = 100;

		return API.getKeysFromDB('results', 1, keysPageSize)
		.then( results => {
			firstPageResults = results.Keys;

			if (firstPageResults.length < firstPageResults){
				return [];
			}

			const pagesCount = Math.ceil(results.Paging.count / keysPageSize);
			const pageNumbers = Array.from(Array(pagesCount).keys());

			console.log(pageNumbers);

			return getChunkPromises(pageNumbers, 10, (pages) => {
				console.log(pages);
				return pages
				.filter( page => page > 0) //filter out first page
				.map( page => API.getKeysFromDB('results', page + 1,  keysPageSize) );
			});

		})
		.then ( results => {

			console.log(results);

			const keys = results.reduce( (prev, res) => {
				return [...prev, ...res.Keys];
			}, []);

			const allKeys = [...firstPageResults, ...keys];
						
			if (allKeys.length > 0){
				
				const resultKeys = allKeys.map( key => {
				
					try{
						const value = JSON.parse(HTMLdecode(key.Value));	

						const totalPoints = value.gamePoints + value.quizPoints + value.friendsIds.length * 5;
						const totalTime = value.gameTime + value.quizTime;
						const forSort = totalPoints - totalTime / 10000000000;

						return {
							...key,
							...{
								totalPoints,
								totalTime,
								forSort,
							},
						}

					}catch(e){
						console.log(e);
						return false;
					}

				})
				.filter( key => key );

				//console.log(resultKeys);

				const sortedResultKeys = [...resultKeys]
				//.sort(sort.sortBy('totalPoints', {
				//	name:'totalTime', primer: parseInt, reverse: true
				//}))
				.sort((a, b) => {
					return b.forSort - a.forSort;
				})
				.slice(0, 100); //get top 100

				dispatch(topActions.setKeys(sortedResultKeys));

				//console.log(sortedResultKeys);

				const usersIds = sortedResultKeys.map( key => key.UserId);
			
				return API.getUsers(usersIds);
			}else{
				dispatch(loadingActions.loadingHide());	
			}

		})		
		.then( users => {		
			dispatch(loadingActions.loadingHide());	
			dispatch(topActions.setUsers(users));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});

	}
}

export function getAllSavedResults(totalResults) {
	return (dispatch, getState) => {

		console.log(totalResults);

		let parsedTotalResult = [];

		try{
			parsedTotalResult = JSON.parse(totalResults.Value.replace(/\'/g, '"'));
		}catch(e){
			console.error(e);
		}

		if (parsedTotalResult.length === 0){
			console.error('no results');
			return false;
		}

		console.log(parsedTotalResult);

		dispatch(topActions.fix());
		dispatch(topActions.setKeys(parsedTotalResult));

		const usersIds = parsedTotalResult.map( item => item.UserId);

		dispatch(loadingActions.loadingShow());	
			
		return API.getUsers(usersIds)
		.then( users => {	
			
			console.log(users);

			dispatch(loadingActions.loadingHide());	
			dispatch(topActions.setUsers(users));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});

	}
}


export function saveResults() {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		const top = getState().top.keys
		.map( key => ({
			UserId: key.UserId,
			//forSort: key.forSort,
			totalPoints: key.totalPoints,
			totalTime: key.totalTime,
		}));

		
		const data = {
			key: 'total-result',
			value: (JSON.stringify(top).replace(/"/g, '\'')),
			permissionLevel: 'Public',
			label: 'total-result',
		}

		console.log(data);

		//return;

		return API.addKeyToDB(data)
		.then( (res) => {	

			console.log('top saved!');
			dispatch(topActions.fix());
			dispatch(loadingActions.loadingHide());

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


export function deleteResults() {

	return (dispatch, getState) => {

		const roles = getState().user.profile.roles;

		if (roles.indexOf('System') === -1){
			return false;
		}

		if (!confirm('Уверены что хотите удалить топ?')){
			return false;
		}

		dispatch(loadingActions.loadingShow());	

		return API.deleteKeyFromDB('total-result')
		.then( (res) => {	
			console.log(res);

			console.log('топ удален');
			dispatch(topActions.unfix());
			dispatch(loadingActions.loadingHide());

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}




export function setQuizData(data) {
	return (dispatch) => {

		dispatch(resultsActions.setQuizData(data));
		dispatch(sendResultsToDB());

	}
}

export function setGameData(data) {
	return (dispatch) => {

		dispatch(resultsActions.setGameData(data));
		dispatch(sendResultsToDB());

	}
}

export function sendResultsToDB(value) {
	return (dispatch, getState) => {

		const results = getState().results;

		console.log(results);

		const userId = getState().user.profile.id;

		if (!userId){
			return false;
		}

		dispatch(loadingActions.loadingShow());	

		const data = {
			key: 'results-' + userId,
			value: HTMLencode(JSON.stringify(results)),
			permissionLevel: 'Public',
			label: 'results',
		}

		return API.addKeyToDB(data)
		.then( (res) => {	
			dispatch(loadingActions.loadingHide());

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}




//comments

export function addComment(value) {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	
		dispatch(commentsFormActions.commentNotAdded());

		const label = getState().comments ? getState().comments.label : 'comments';
		const pageNumber = getState().comments ? getState().comments.page : 1;
		
		const userId = getState().user.profile.id;

		const data = {
			key: 'comment-' + userId + '-' + new Date().getTime(),
			value: value,
			permissionLevel: 'Public',
			label: label,
		}

		return API.addKeyToDB(data)
		.then( (res) => {	
			dispatch(loadingActions.loadingHide());

			dispatch(commentAdded());

			setTimeout( () => {
				dispatch(commentsFormActions.commentNotAdded());
			}, 3000);

			if (pageNumber === 1){
				dispatch(getComments());
			}else{
				dispatch(setCommentsPage(1));
			}

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function commentAdded() {

	return (dispatch, getState) => {
		dispatch(commentsFormActions.messageClear());
		dispatch(commentsFormActions.deleteQuote());
		dispatch(commentsFormActions.commentAdded());
	}
}

export function getComments() {

	console.log('get comments');

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	

		const pageNumber = getState().comments ? getState().comments.page : 1;
		const label = getState().comments ? getState().comments.label : 'comments';

		let comments;
		let counters;
		let firstPageCounters;

		const countersPageSize = 100;

		return API.getKeysFromDBdesc(label, pageNumber, CommentsOptions.pageSize)
		.then( res => {
			comments = res;
			return API.getCoutersFromDBdesc(label, 1, countersPageSize); //fist request to get counters total count
		})
		.then( res => {			
			firstPageCounters = res.Counters;

			if (res.Paging.count < countersPageSize){
				return []; //return empry array if 1 page is enouth
			}

			const pagesCount = Math.ceil(res.Paging.count / countersPageSize);
			const pageNumbers = Array.from(Array(pagesCount).keys());

			console.log(pageNumbers);

			return getChunkPromises(pageNumbers, 10, (pages) => {
				console.log(pages);
				return pages
				.filter( page => page > 0) //filter out first page
				.map( page => API.getCoutersFromDBdesc(label, page + 1,  countersPageSize) );
			});

		})
		.then( results => {

			console.log(results);

			const counters = results.reduce( (prev, res) => {
				return [...prev, ...res.Counters];
			}, []);

			const allCounters = [...firstPageCounters, ...counters];
			
			console.log(counters);
			
			dispatch(loadingActions.loadingHide());

			console.log(comments.Keys);
			console.log(counters);

			comments.Keys = comments.Keys.map( key => {
				key.counter = false;

				allCounters.map( counter => {
					if (parseInt(counter.Name) === key.Id){
						key.counter = counter;
					}
				});

				return key;
			});

			console.log(comments, counters);
			dispatch(commentsActions.addItems({comments: comments, counters: allCounters}));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function deleteComment(commentId) {

	return (dispatch, getState) => {

		const roles = getState().user.profile.roles;

		if (roles.indexOf('System') === -1){
			return false;
		}

		if (!confirm('Уверены что хотите удалить эту запись?')){
			return false;
		}

		dispatch(loadingActions.loadingShow());	

		return API.deleteKeyFromDB(commentId)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				dispatch(getComments());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}


export function editComment(comment, data) {

	return (dispatch, getState) => {

		const label = getState().comments ? getState().comments.label : 'comments';
		const pageNumber = getState().comments ? getState().comments.page : 1;

		let oldValue 

		try{
			oldValue = JSON.parse(HTMLdecode(comment.Value));
		}catch(e){
			console.error(e);
			return false;
		}
		
		const oldQuote = oldValue.quote;

		console.log(oldQuote.Value);
		
		let oldQuoteValue;

		try{
			oldQuoteValue = oldQuote ? JSON.parse(HTMLdecode(oldQuote.Value)) : false;
		}catch(e){
			console.error(e);
			return false;
		}

		let newQuoteValue;
		let newQuote;
		
		if (data.newQuoteMessage && oldQuote){

			newQuoteValue = {
				...oldQuoteValue, 
				...{
					message: data.newQuoteMessage
				}
			};

			newQuoteValue = HTMLencode(JSON.stringify(newQuoteValue));

			newQuote = {
				...oldValue.quote,
				...{Value: newQuoteValue}
			}			

		}

		if (data.newQuoteMessage === ''){
			newQuote = false;
		}


		console.log(oldQuote);
		console.log(newQuote);
	
		let newValue = {
			...oldValue, 
			...{
				message: data.newMessage,
				quote: newQuote !== undefined ? newQuote : oldQuote,
			}
		};

		console.log(oldValue);
		console.log(newValue);

		newValue = HTMLencode(JSON.stringify(newValue));

		const newComment = {...comment, ...{Value: newValue}};

		console.log(comment);
		console.log(newComment);
		//return;


		return API.addKeyToDB(newComment)
		.then( (res) => {	
			dispatch(loadingActions.loadingHide());
			
			dispatch(commentsActions.editOff());

			dispatch(getComments());

		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function vote(keyId) {

	return (dispatch, getState) => {
		dispatch(loadingActions.loadingShow());	
		
		const label = getState().comments ? getState().comments.label : 'comments';

		return API.voteForCounterFromDB(keyId, label)
		.then( (res) => {	
			console.log(res);
			dispatch(loadingActions.loadingHide());

			if (res.type !== 'systemForbidden'){
				dispatch(getComments());
			}
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(catchError(err)); 
		});
	}
}

export function addQuote(quote) {

	return dispatch => {

		dispatch(commentsFormActions.addQuote(quote)); 
		visual.scrollTo(document.body, document.querySelector('.comments'), 600);

	}
}


export function setCommentsPage(pageId) {

	return (dispatch, getState) => {

		const pageUrl = pageId > 1 ? '/page/' + pageId : '/';

		if (getState().comments && getState().comments.page !== pageId){
			dispatch(commentsActions.setPage(pageId)); 
			visual.scrollTo(document.body, document.querySelector('.comments'), 200);
		}	
		
	}
}

//comments form
export function commentsFormSubmit() {

	return (dispatch, getState) => {

		const state = getState();

		const message = state.commentsForm.message;
		const anon = state.commentsForm.anon;
		const quote = state.commentsForm.quote;

		const { profile } = state.user;

		let user;
		const anonAvatar = CommentsOptions.anonAvatar;

		if (!anon){
			user = {
				id: profile.id_str,
				firstName: profile.firstName,
				lastName: profile.lastName,
				roles: profile.roles,
				photoSmall: profile.photoMedium ? profile.photoMedium : anonAvatar,
			}
		}else{
			user = {
				id: 0,
				firstName: 'Аноним',
				lastName: '',
				roles: [],
				photoSmall: anonAvatar,
			}			
		}

		let value = {
			user: user,
			message: message,
			quote: quote,
		}

		value = HTMLencode(JSON.stringify(value));

		console.log(value);

		dispatch(addComment(value));
		
	}
}



//init

export function getInitialData(pageAfterLogin = '/') {

	return dispatch => {
		dispatch(loadingActions.loadingShow());	

		return API.getUser()
		.then( (user) => {	
			dispatch(loadingActions.loadingHide());

			dispatch(userActions.userSet(user));
			dispatch(pageActions.setPageWithoutHistory(pageAfterLogin));
		})
		.catch( err => { 
			dispatch(loadingActions.loadingHide());

			dispatch(pageActions.setPageWithoutHistory('/'));
			dispatch(catchError(err)); 
		})
		.then( () => {			
			
		})
	}
}


export function init() {
	return dispatch => {
		return dispatch(getInitialData());	
	}
}

