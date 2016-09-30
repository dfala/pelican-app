angular.module('starter.controllers')

.controller('HomeController', function($scope, apiService, $stateParams, storageService) {
  $scope.posts = [];
  var postId = $stateParams.postId || null;

  // THIS CHAOS IS DONE TO BE ABLE TO SEND DATA
  // TO POST VIEW WITHOUT DOING ANOTHER API REQUEST

  function getPosts () {
    apiService.getHomeFeed()
    .then(function (response) {
      $scope.posts = response;
      if (postId) findPost(postId);
    })
    .catch(function (err) {
      console.log(err);
    })
  }

  if (!storageService.posts) {
    getPosts();
  } else {
    $scope.posts = storageService.posts;
  }

  if (postId) {
    findPost(postId);
  };

  function findPost (id) {
    for (var i = 0; i < $scope.posts.length; i++) {
      if ($scope.posts[i]._id === id) {
        $scope.post = $scope.posts[i];
        return;
      }
    }
  };

  // END OF CHAOS

  $scope.openLink = function (post) {
    window.open(post.link, '_system');
  };

})
