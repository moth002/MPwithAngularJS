angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$resource', '$routeParams', 'FooterBtnService', 'cordovaReady',
        function ($scope, $resource, $routeParams, FooterBtnService, cordovaReady) {
            $scope.init = function () {
                var userId = $routeParams.barcode;

                var User = $resource(apiUrl + 'api/user/:userId', { userId: '@id' });
                var user = User.get({ userId: userId }, function () {
                    $scope.user = user;
                }, function (err) {
                    alert(err.status);
                });

                $scope.model = {
                    message: "Scan the patient's wristband or enter the NHI"
                }

                FooterBtnService.setRight('Next', true);
                FooterBtnService.setMiddle('', false);
            }    

            $scope.scanCode = function () {
                cordovaReady(cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.userId = result.text;
                        window.location = '#/order/' + result.text;
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }
        }
    ]);