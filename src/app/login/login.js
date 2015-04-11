angular.module('store.login', [
	'ui.router',
	'facebook',
	'Data'
	])

.config( ['$stateProvider', '$urlRouterProvider',function myAppConfig ( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state('login', {
		url: '/login',
		views: {
			'body': {
				templateUrl:'login/login.tpl.html',
				controller: 'LoginController',
			},
			'navbar': {
				templateUrl:'../common/templates/navbar.tpl.html'
			}
		},
		data: {
			pageTitle: 'Prijava'
		}
	});

	//FacebookProvider.init('567297326740751');
}])
;