angular.module('goodworks')
    .factory('cache', ['$q', function ($q) {
        return {
            set: function (key, data) {
                var d = $q.defer();
                var cacheItem = JSON.stringify(data || []);
                window.localStorage.setItem(key, cacheItem);
                d.resolve();
                return d.promise;
            },
            get: function (key) {
                var d = $q.defer();
                var cacheItem = window.localStorage.getItem(key) || "[]";
                var obj = JSON.parse(cacheItem);
                d.resolve(obj);
                return d.promise;
            }
        };
    }]);