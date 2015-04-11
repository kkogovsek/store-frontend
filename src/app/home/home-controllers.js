angular.module('store.buy')
.controller('BuyController', ['$scope','CommonData','$modal', function($scope, CommonData, $modal) {
	$scope.selected = {
		name: '',
		category: ''
	};

	$scope.categories = [
		{
			name:'Sadje'
		},
		{
			name: 'Zelenjava'
		},
		{
			name: 'Živaljski proizvodi'
		}
	];	

	$scope.items = [
		{
			name:"Jabolko",
			category: 'Sadje',
			src: 'http://img3.wikia.nocookie.net/__cb20120817164648/adventuretimewithfinnandjake/images/7/7d/Apple.png'
		},
		{
			name: "Jajca",
			category: 'Živaljski proizvodi',
			src: 'http://pngimg.com/upload/egg_PNG25.png'
		},
		{
			name:'Paradižnik',
			category: 'Zelenjava',
			src: 'http://pngimg.com/upload/tamato_PNG2041.png'
		}
	];

	$scope.openItem = function (item) {

	    var modalInstance = $modal.open({
	      templateUrl: 'home/item.tpl.html',
	      controller: 'ItemController',
	      resolve: {
	      	item: function() {
	      		return item;
	      	}
	      }
	    });

	    modalInstance.result.then(
	    	function (selectedItem) {
	      		//$scope.selected = selectedItem;
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
	 		}
		);
	}
}])

.controller('ItemController', ['$scope','item', function($scope, item){
	$scope.item = item;	
}])
;