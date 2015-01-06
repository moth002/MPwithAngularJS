angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$resource', 'FooterBtnService', function ($scope, $resource, FooterBtnService) {

            $scope.init = function () {

                var User = $resource('http://mohammed-pc/WebApi/api/user/:userId', { userId: '@id' });
                var user = User.get({ userId: 123456 }, function () {
                    $scope.user = user;
                }, function (err) {
                    alert(err.status);
                });

                $scope.model = {
                    message: "Scan the patient's wristband or enter the NHI"
                }

                FooterBtnService.setRight('Next', true);
                FooterBtnService.setMiddle('Re-print labels', true);
            }    

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