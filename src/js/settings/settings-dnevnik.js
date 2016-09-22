export const OAuthOptions = {
	provider: 'storksDnevnik',
	authUrl: 'https://login.dnevnik.ru/oauth2',
	grantUrl: 'https://api.dnevnik.ru/v1/authorizations',
	scope: 'Avatar,FullName,Roles,Friends,Wall,Messages',	
	clientId: '112b540bc66c4ad7af49edb09f20bdbf',
	redirectUrl: 'https://ad.dnevnik.ru/promo/oauth2',
}

export const APIoptions = {	
	base: 'https://api.dnevnik.ru/v1/',
}

export const PromoOptions = {	
	url: 'https://ad.dnevnik.ru/promo/storks',
	server: 'https://dnevnik.ru',
	cdn: 'https://ad.csdnevnik.ru/special/staging/storks-demo/',
}

export const CommentsOptions = {	
	pageSize: 15,
	adminId: [
		'1000005031742'
	],
	anonAvatar: 'https://static.dnevnik.ru/images/avatars/user/a.m.jpg',
}
