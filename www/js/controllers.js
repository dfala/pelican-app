angular.module('starter.controllers', ['ionic.cloud'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, apiService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PostController', function($scope, $stateParams, apiService, $timeout) {
  $scope.loading = true;

  apiService.findPost($stateParams.postId)
  .then(function (response) {
    $timeout(function () {
      $scope.loading = false;
      $scope.post = response.data;
    }, 400)
  })
  .catch(function (err) {
    console.error(err);
  })

  $scope.openLink = function (post) {
    window.open(post.link, '_system');
  };
})

.directive('lazyLoad', function (apiService, $timeout, $ionicScrollDelegate) {
  return {
    restrict: 'A',
    link: function (scope, elem, attr) {
      scope.loadMore = function () {
        apiService.lazyLoad(scope.posts.length)
        .then(function (response) {
          if (!response.data || !response.data.length) return (scope.cantLoad = true);
          scope.posts = scope.posts.concat(response.data);
          scope.$broadcast('scroll.infiniteScrollComplete');
        })
        .catch(function (err) {
          console.error(err);
        })
      };
    }
  }
});
