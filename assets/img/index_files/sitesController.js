angular.module('goodworks').controller('DashCtrl', function($scope, $location, SiteService) {
	SiteService.all().then(function(sites) {

		_.each(sites, function(s) {
			if ((s.photos || []).length > 0) {
				s.coverPhoto = s.photos[0].imageUri;
			}
			// var formattedDate = moment(s.createdDate.$date).fromNow();
			// s.createdDate.$dateformatted = formattedDate;
		});

		$scope.sites = sites;
	});

	// var TestObject = Parse.Object.extend("TestObject");
	// var testObject = new TestObject();
	// testObject.save({foo: "bar"}).then(function(object) {
	// alert("yay! it worked");
	// });

	$scope.viewDetails = function(siteId) {
		$location.path("/tab/site/" + siteId);
	};
}); 