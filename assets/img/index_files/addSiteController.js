angular.module('goodworks').controller('AddSiteCtrl', function($scope, $location, SiteService, LocationService) {

	LocationService.getCurrentPosition().then(function(pos) {
		$scope.site.lat = pos.lat;
		$scope.site.lng = pos.lng;
		$scope.site.place = pos.lat + ", " + pos.lng;
		LocationService.getLocationAddress(pos.lat, pos.lng).then(function(placeName) {
			$scope.site.place = placeName;
		})
	});

	$scope.site = {};

	$scope.create = function() {
		SiteService.add($scope.site.lat, $scope.site.lng, $scope.site.place, $scope.site.name, $scope.site.story, $scope.site.directions, $scope.site.contacts).then(function() {
			$location.path("/");
		})
	};

}); 