angular.module('starter.controllers')

.controller('UserBrowseController', function($scope, apiService, $stateParams, storageService) {
  $scope.users = [];

  function getUsers () {
    apiService.getUsers()
    .then(function (response) {
      $scope.users = response.data;
    })
    .catch(function (err) {
      console.error(err);
    })
  }

  getUsers();

})
