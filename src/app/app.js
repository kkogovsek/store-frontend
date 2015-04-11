angular.module('appModule', [
	'templates',
	'ui.router',
	'store.login',
	'store.buy'
])


.config( ['$stateProvider', '$urlRouterProvider',function myAppConfig ( $stateProvider, $urlRouterProvider ) {
	$urlRouterProvider.otherwise( '/home' );
}])

.controller( 'MainController', ['$scope', '$location',function AppCtrl ( $scope, $location ) {
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if ( angular.isDefined( toState.data.pageTitle ) ) {
			$scope.pageTitle = toState.data.pageTitle + ' | Store' ;
		}
	});
}])
;