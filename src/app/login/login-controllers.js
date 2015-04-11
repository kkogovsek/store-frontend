angular.module('store.login')
.controller('LoginController', ['$scope', 'Facebook', 'CommonData',function ($scope, Facebook,CommonData) {
	//Facebook prijava
	/*
	$scope.facebook = {
		login : function() {
			Facebook.login(function(response) {
	        	// Do something with response.
	    	});
	    },
		getLoginStatus : function() {
	     	Facebook.getLoginStatus(function(response) {
	    	if(response.status === 'connected') {
	        	$scope.loggedIn = true;
	        } else {
	        	$scope.loggedIn = false;
	        }
	      });
	    },
	    me : function() {
	     	Facebook.api('/me', function(response) {
	    		$scope.user = response;
	    	});
	    },
	    profile : function() {
	     	Facebook.api('/me/picture', function(response) {
	    		$scope.user = response;
	    	});
	    }	    
	};
	*/
}])
;