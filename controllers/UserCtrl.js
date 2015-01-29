angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$resource', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService',
        function ($scope, $resource, $routeParams, footerBtnService, cordovaReady, dataIdService) {
            $scope.init = function () {
                var userId = $routeParams.barcode;

                //var User = $resource(window.apiUrl + 'api/user/:userId', { userId: '@id' });
                var User = $resource('http://mohammed-pc/Eclair/api/PhoneUserAuthenticate/:userId', { userId: '@id' });
                var user = User.get({ userId: userId }, function () {
                    $scope.user = user;
                }, function (err) {
                    alert(err.status);
                });

                dataIdService.setIDs(userId, '');

                $scope.model = {
                    message: "Scan the patient's wristband or enter the NHI",
                    show: userId
                }

                

                footerBtnService.setRight('Next', true);
                footerBtnService.setMiddle('', false);
            }    

            $scope.scanCode = function () {
                cordovaReady(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        //$scope.userId = result.text; fix this
                        window.location = '#/patient/' + result.text;
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }
        }
    ]);