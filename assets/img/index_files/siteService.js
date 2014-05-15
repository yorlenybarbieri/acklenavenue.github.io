angular.module('goodworks').factory('SiteService', ['$q', 'cache', 
function($q, cache) {

	var cacheKey = "sites";
	
	var seedSites = [{
		id : 0,
		name : 'Maria Martinez',
		location : [-88.27636550999998, 13.92649626],	
		place: "La Tigre, Francisco Morazan",
		story: "We heard about Maria through the preacher who works in her area. She is a single mom and has 4 kids. Right now, they live in a small adobe house with a dirt floor and no windows or doors. Nulla dictum nunc vel lobortis ultrices. Aliquam faucibus neque diam, ultrices ornare quam congue in. Sed vitae erat eu magna ultrices aliquam. Duis porta nisl non varius vulputate.",
		photos : [{
			imageUri : "https://www.worldvision.org/resources.nsf/main/enews-200904/$file/honduras-1.jpg"
		}]
	}, {
		id : 1,
		name : 'The Vasquez Family',
		location : [-87.27636550999998, 13.92649626],
		place: "Santa Ana, Francisco Morazan",
		story: "We heard about the Vasquez family through the preacher who works in her area. There are 10 people who live together in this small house. Nulla dictum nunc vel lobortis ultrices. Aliquam faucibus neque diam, ultrices ornare quam congue in. Sed vitae erat eu magna ultrices aliquam. Duis porta nisl non varius vulputate.",
		photos:[{imageUri: "http://4.bp.blogspot.com/-hELeCP-Dz8s/Ucb0tqRha1I/AAAAAAAAAXw/IUMKnCZV8QQ/s1600/IMG_6303.JPG"}]
	}, {
		id : 2,
		name : 'Montenegro',
		location : [-86.27636550999998, 13.92649626],
		place: "Aguacatal, Francisco Morazan",
		story: "Nulla dictum nunc vel lobortis ultrices. Aliquam faucibus neque diam, ultrices ornare quam congue in. Sed vitae erat eu magna ultrices aliquam. Duis porta nisl non varius vulputate.",
		photos:[{imageUri: "http://treymorgan.net/wp-content/uploads/2010/08/carrasco-family.jpg"}]
		
	}, {
		id : 3,
		name : 'Rivera Family',
		location : [-85.27636550999998, 13.92649626],
		place: "Buen Samaritano, Francisco Morazan",
		story: "Nulla dictum nunc vel lobortis ultrices. Aliquam faucibus neque diam, ultrices ornare quam congue in. Sed vitae erat eu magna ultrices aliquam. Duis porta nisl non varius vulputate.",
		photos:[{imageUri: "http://www.proyectomirador.org/sites/default/files/imagecache/gallery_sub_large/gallery/why_honduras/poverty/room-dirt-floor-sleeps-family-8.jpg"}]		
	}];

	var getById = function(siteId){
		var d = $q.defer();
		cache.get(cacheKey).then(function(sites){
			var site = _.find(sites, function(s){
				return s.id==siteId;
			});
			d.resolve(site);	
		}).catch(function(err){
			d.reject("Not found.");
		});			
		return d.promise;
	};
	
	return {
		all : function() {
			var d = $q.defer();
			cache.get(cacheKey).then(function(sites){
				if(sites.length==0){
					cache.set(cacheKey, seedSites);
					sites = seedSites;
				}
				d.resolve(sites);
			});
			
			return d.promise;
		},
		get : function(siteId) {			
			return getById(siteId);
		},
		addPhoto: function(siteId, imageUri){
			var d = $q.defer();
			cache.get(cacheKey).then(function(sites){
				_.each(sites, function(site){
					if(site.id==siteId){					
						site.photos = site.photos || [];
						var newPhoto = {
							id : site.photos.length,
							imageUri : imageUri
						};
						site.photos.push(newPhoto);
						d.resolve(newPhoto);
					}
				});
				cache.set(cacheKey, sites);
			});					
			return d.promise;	 
		},
		add : function(latitude, longitude, place, name, story, directions, contacts) {
			var d = $q.defer();
			cache.get(cacheKey).then(function(sites){
			
				var newSite = {
					id : sites.length,
					name : name,
					place: place,
					story : story,
					directions : directions,
					contacts : contacts,
					location : [longitude, latitude]
				}
				sites.push(newSite);
				cache.set(cacheKey, sites);
				d.resolve(newSite);
			});
			return d.promise;
		}
	}
}]);
