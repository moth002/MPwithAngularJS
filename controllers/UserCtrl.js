angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', 'FooterBtnService', function ($scope, FooterBtnService) {
            $scope.model = {
                message: "Scan the patient's wristband or enter the NHI"
            }

            FooterBtnService.setRight('Next', true);
            FooterBtnService.setMiddle('Re-print labels', true);

            $scope.scanCode = function() {
                cordova.plugins.barcodeScanner.scan(
                    function(result) {
                        window.location = '#/order/' + result.text;
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