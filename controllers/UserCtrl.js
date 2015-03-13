angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService', '$q',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReady, dataIdService, $q) {
            $scope.init = function () {
                var defer = $q.defer();

                footerBtnService.setRight('Next', true, '#/patient/I0I0039');
                footerBtnService.setMiddle('', false, '');

                defer.promise.then(function() {
                    cordovaReady(window.plugins.spinnerDialog.hide());
                });

                var userModel = {
                    barcode: $routeParams.usercode,
                    pincode: $routeParams.pincode
                }

                $http.post(window.apiUrl + 'UserLogon', userModel)
                    .success(function(response) {
                        $scope.user = response;
                        dataIdService.setIDs(userModel.barcode, '', response.Token);
                        defer.resolve();
                    })
                    .error(function(err, status) {
                        if (status === 404){
                            alert("User is not found or pincode is wrong");
                        } else {
                            alert(err.Message);
                        }
                        defer.resolve();
                        window.location = '#/';
                    });

                $scope.model = {
                    message: "Scan the patient's wristband or enter the NHI"
                }
            }

            $scope.scanCode = function () {
                cordovaReady(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.patientId = result.text;
                        window.location = '#/patient/' + result.text;
                        window.plugins.spinnerDialog.show(null, "Getting Data", true);
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }

        }
    ]);