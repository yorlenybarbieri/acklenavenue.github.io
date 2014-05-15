angular.module('goodworks').factory('PhotoService', ['$q',
function($q) {

	var inited = false;

	return {
		init : function() {
			if (!navigator.camera) {
				navigator.camera = {
					getPicture : function(successCallback) {
						alert("Simulating the camera. Will return a default image.");
						successCallback("http://4.bp.blogspot.com/-hELeCP-Dz8s/Ucb0tqRha1I/AAAAAAAAAXw/IUMKnCZV8QQ/s1600/IMG_6303.JPG");
					}
				};
			}
			inited = true;
		},
		takePicture : function(source) {
			if (!inited) {
				alert("Cannot use the PhotoService without first initializing it (init).");
				return;
			}
			var def = $q.defer();

			var sourceType = 0;
			//library
			if (source == "camera")
				sourceType = 1;

			var options = {
				quality : 40,
				destinationType : 1, //FILE_URI
				sourceType : sourceType,
				encodingType : 0, //JPEG
				MediaType : 0, //IMAGE
				targetWidth : 320,
				targetHeight : 300
			};

			navigator.camera.getPicture(function(imageUri) {
				def.resolve(imageUri);
			}, function(err) {
				def.reject(err);
			}, options);

			return def.promise;
		}
	};
}]);
