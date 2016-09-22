// export const OAuthOptions = {
// 	provider: 'storksLocal',
// 	authUrl: 'https://login.staging.dnevnik.ru/oauth2',
// 	grantUrl: 'https://api.staging.dnevnik.ru/v1/authorizations',
// 	scope: 'Avatar,FullName,Birthday,Age,Roles,Schools,Organizations,EduGroups,Lessons,Marks,EduWorks,Relatives,Files,Contacts,Friends,Groups,Networks,Events,Wall,Messages,EmailAddress,Sex,SocialEntityMembership',	
// 	clientId: '5123975fe9eb415390fb7aa316a15e4e',
// 	redirectUrl: '//localhost:9000/oauth.html',
// }

// export const APIoptions = {	
// 	base: 'https://api.staging.dnevnik.ru/v1/',
// }

// export const PromoOptions = {	
// 	url: 'https://ad.dnevnik.ru/promo/storks-demo',
// 	server: 'https://staging.dnevnik.ru',
// 	cdn: 'https://ad.csdnevnik.ru/special/staging/storks-demo/',
// }

// export const CommentsOptions = {	
// 	pageSize: 5,
// 	adminId: [
// 		'1000005031742'
// 	],
// 	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
// }


export const OAuthOptions = {
	provider: 'storksDnevnik',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Friends,Wall,Messages',	
	clientId: '112b540bc66c4ad7af49edb09f20bdbf',
	redirectUrl: '//localhost:9000/oauth.html',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnevnik.ru/promo/storks-demo',
	server: 'https://dnevnik.ru',
	cdn: 'https://ad.csdnevnik.ru/special/staging/storks-demo/',
}

export const CommentsOptions = {	
	pageSize: 5,
	adminId: [
		'1000005031742'
	],
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
}

