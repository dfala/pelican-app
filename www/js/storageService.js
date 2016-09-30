angular.module('starter.controllers')

.factory('storageService', function($http, $timeout) {
  var service = {};

  service.storePosts = function (posts) {
    service.posts = posts;
  };

  return service
});
