angular.module('store.buy', [
	'ui.router',
	'ui.bootstrap',
	'Data'
])

.config( ['$stateProvider', '$urlRouterProvider',function myAppConfig ( $stateProvider, $urlRouterProvider ) {
	$stateProvider.state('home', {
		url: '/home',
		views: {
			'body': {
				templateUrl:'home/home.tpl.html',
				controller: 'BuyController',
			},
			'navbar': {
				templateUrl:'../common/templates/navbar.tpl.html'
			}
		},
		data: {
			pageTitle: 'Spletna trgovina'
		}
	})
	;
}])
;