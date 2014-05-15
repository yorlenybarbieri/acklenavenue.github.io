angular.module('goodworks').controller('LoginController', function($scope, $timeout, $ionicLoading, $location) {
	$scope.facebookReady = false;

	$scope.data = { };

	var finishLoginWithParse = function(result) {

		var facebookAuthData = {
			"id" : result.id + "",
			"access_token" : result["accessToken"],
			"expiration_date" : result["expirationDate"].slice(0, -1).replace("+", ".") + "Z"
		};

		Parse.FacebookUtils.logIn(facebookAuthData, {
			success : function(_user) {
				console.log("User is logged into Parse");
				$scope.loginLoading.hide();
				$location.path("/dash");
			},
			error : function(error1, error2) {
				alert("Unable to create/login to as Facebook user");
				console.log("  ERROR1 = " + JSON.stringify(error1));
				console.log("  ERROR2 = " + JSON.stringify(error2));
				$scope.loginLoading.hide();
			}
		});

	};

	var facebookLogin = function() {

		$scope.loginLoading = $ionicLoading.show({
			content : 'Iniciando Sesion...',
			animation : 'fade-in',
			showBackdrop : false,
			maxWidth : 200,
			showDelay : 500
		});

		openFB.login('email', finishLoginWithParse, function(error) {
			alert('Facebook login failed: ' + error.error_description);
		});

	};

});
