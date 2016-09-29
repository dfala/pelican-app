angular.module('starter.controllers')

.factory('apiService', function($http, $timeout) {
  var service = {};
  var url = 'https://thepelicanblog.com/api/';

  service.getHomeFeed = function () {
    return $http.get(url + 'posts');
  };

  return service
});
