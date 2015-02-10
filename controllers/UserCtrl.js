angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$resource', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService', '$ionicModal', '$location', '$timeout',
        function ($scope, $resource, $routeParams, footerBtnService, cordovaReady, dataIdService, $ionicModal, $location, $timeout) {
            $scope.init = function () {
                var userCode = $routeParams.usercode;
                var pinCode = $routeParams.pincode;

                var User = $resource(window.apiUrl + 'GetUserAuthentication/:user');
                var user = User.get({ user: userCode, pin: pinCode }, function () {
                    $scope.user = user;
                }, function (err) {
                    alert("User is not found or pincode is wrong");
                    window.location = '#/';
                });

                dataIdService.setIDs(userCode, '');

                $scope.model = {
                    message: "Scan the patient's wristband or enter the NHI"
                }

                footerBtnService.setRight('Next', true);
                footerBtnService.setMiddle('', false);
            }

            $scope.scanCode = function () {
                cordovaReady(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.patientId = result.text;
                        window.location = '#/patient/' + result.text;
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }

        }
    ]);