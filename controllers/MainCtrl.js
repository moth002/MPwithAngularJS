angular.module('myApp')
    .controller("MainCtrl", [
        '$scope', 'cordovaReady', 'FooterBtnService',
        function ($scope, cordovaReady, FooterBtnService) {
            $scope.model = {
                message: "Scan or enter your ID"
            }

            FooterBtnService.setRight('Next', true);
            FooterBtnService.setMiddle('', false);

            $scope.scanCode = function() {
                cordovaReady(cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        $scope.userId = result.text;
                        window.location = '#/user/' + result.text;
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }

        }
    ]);