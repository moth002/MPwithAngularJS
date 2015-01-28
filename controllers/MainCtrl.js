angular.module('myApp')
    .controller("MainCtrl", [
        '$scope', 'cordovaReady', 'footerBtnService', 'dataIdService',
        function ($scope, cordovaReady, footerBtnService, dataIdService) {
            $scope.model = {
                message: "Scan or enter your ID"
            }

            $scope.idList = dataIdService.getIDs;

            footerBtnService.setRight('Next', true);

            $scope.scanCode = function() {
                cordovaReady(cordova.plugins.MWBScanner.startScanning(
                    function(result) {
                        //$scope.userId = result.text; must change this
                        window.location = '#/user/' + result.code;
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }

        }
    ]);