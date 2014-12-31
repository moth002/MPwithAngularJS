angular.module('myApp')
    .controller("MainCtrl", [
        '$scope', 'FooterBtnService', function($scope, FooterBtnService) {
            $scope.model = {
                message: "Scan or enter your ID"
            }

            FooterBtnService.setRight('Next', true);
            FooterBtnService.setMiddle('', false);

            $scope.scanCode = function() {
                cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        $scope.userId = result.text;
                        window.location = '#/user/' + result.text;
                        //alert("We got a barcode\n" +
                        //    "Result: " + result.text + "\n" +
                        //    "Format: " + result.format + "\n" +
                        //    "Cancelled: " + result.cancelled);
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                );
            }

        }
    ]);