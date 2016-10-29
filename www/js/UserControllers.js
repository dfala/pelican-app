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

.controller('UserPostsController', function($scope, apiService, $stateParams, storageService) {
  var userId = $stateParams.userId || null;
  $scope.loading = true;

  apiService.getUserPosts(userId)
  .then(function (response) {
    // storageService.storePosts(response.data);
    $scope.loading = false;
    $scope.posts = response.data;
  })
  .catch(function (err) {
    console.error(err);
  })
});
