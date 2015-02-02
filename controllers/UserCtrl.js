angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$resource', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService', '$ionicModal', '$location', '$timeout',
        function ($scope, $resource, $routeParams, footerBtnService, cordovaReady, dataIdService, $ionicModal, $location, $timeout) {
            $scope.init = function () {
                var userId = $routeParams.barcode;

                var User = $resource(window.apiUrl + 'api/PhoneUserAuthenticate/:userId', { userId: '@id' });
                var user = User.get({ userId: userId }, function () {
                    $scope.user = user;
                }, function (err) {
                    alert("User is not found or pincode is wrong");
                    window.location = '#/';
                });

                dataIdService.setIDs(userId, '');

                $scope.model = {
                    message: "Scan the patient's wristband or enter the NHI",
                    show: userId
                }

                footerBtnService.setRight('Next', true);
                footerBtnService.setMiddle('', false);
            }

        }
    ]);