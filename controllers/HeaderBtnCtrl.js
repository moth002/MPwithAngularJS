angular.module('myApp')
    .controller("HeaderBtnCtrl", [
        '$scope', '$rootScope', '$ionicSideMenuDelegate', 'cordovaReady',
            function ($scope, $rootScope, $ionicSideMenuDelegate, cordovaReady) {

                $scope.btnSideMenu = function () {
                    $ionicSideMenuDelegate.toggleLeft();
                };

                $scope.btnGoBack = function () {
                    $rootScope.history.back();
                };
            }
    ]);