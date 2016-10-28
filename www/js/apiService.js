angular.module('starter.controllers')

.factory('apiService', function($http, $timeout, $q, storageService, $ionicAuth) {
  var service = {};
  var url = 'https://thepelicanblog.com/api';

  service.getHomeFeed = function () {
    var defer = $q.defer();

    $http.get(url + '/posts')
    .then(function (response) {
      storageService.storePosts(response.data);
      return defer.resolve(response.data);
    })
    .catch(function (err) {
      return defer.reject(err);
    })

    return defer.promise;
  };

  service.findPost = function (postId) {
    return $http.get(url + '/post/' + postId);
  };

  service.login = function () {
    return $ionicAuth.login('facebook');
    // return $http.jsonp('https://thepelicanblog.com/auth/app-facebook');
  };

  service.getUsers = function () {
    return $http.get(url + '/users');
  };

  service.getUserPosts = function (userId) {
    return $http.get(url + '/user-posts/' + userId);
  };

  return service
});
