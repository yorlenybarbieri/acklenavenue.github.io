angular.module('goodworks').controller('SiteDetailCtrl', function($scope, $rootScope, $stateParams, $ionicPlatform, $ionicActionSheet, SiteService, PhotoService) {

	PhotoService.init();	

	$scope.checkIn = function(){
		alert("The idea with this button is that group members can 'check-in' to this build site, possibly putting something on their facebook wall about their participation.");	
	};
	
	$scope.share = function(){
		alert("This feature will allow people to share site details with friends by email, facebook or twitter.");	
	};
	
	$scope.takePicture = function() {
		$ionicActionSheet.show({
			buttons: [
		       { text: 'From Camera' },
		       { text: 'From Library' },
		     ],
		     titleText: 'Add a Photo',
		     cancelText: 'Cancel',
		     buttonClicked: function(index) {
		     	var source = "library"; 
		       if(index==0){
		       	source= "camera";
		       }
		       
		       PhotoService.takePicture(source).then(function(imageUri) {
					SiteService.addPhoto($scope.site.id, imageUri).then(function(newPhoto) {
						$scope.site.photos.push(newPhoto);
					});
				});
				return true;
		     }
		});
		
	};

	SiteService.get($stateParams.siteId).then(function(site) {

		$scope.site = site;
		$scope.site.photos = $scope.site.photos || [];

		$ionicPlatform.ready(function() {
			$scope.marker.coords = {
				latitude : site.location[1],
				longitude : site.location[0]
			};

			$scope.map = {
				center : $scope.marker.coords,
				zoom : 17,
				refresh : true
			};
		});
	});

	$scope.marker = {
		coords : {
			latitude : 15.22,
			longitude : -89.88
		}
	};

	$scope.map = {
		center : $scope.marker.coords,
		zoom : 10,
		refresh : false,
		options : {
			//disableDefaultUI : true,
			mapTypeId : google.maps.MapTypeId.HYBRID
		}
	};

});