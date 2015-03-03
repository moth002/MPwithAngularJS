angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReady, dataIdService) {
            $scope.init = function () {
                var userModel = {
                    barcode: $routeParams.usercode,
                    pincode: $routeParams.pincode
                }
                var userCode = $routeParams.usercode;
                var pinCode = $routeParams.pincode;

                $http.post(window.apiUrl + 'UserLogon', userModel)
                    .success(function(response) {
                        $scope.user = response;
                        dataIdService.setIDs(userCode, '', response.Token);
                    })
                    .error(function(err, status) {
                        if (status === 404){
                            alert("User is not found or pincode is wrong");
                        } else {
                            alert(err.Message);
                        }
                        window.location = '#/';
                    });

                //var User = $resource(window.apiUrl + 'GetUserAuthentication/:id');
                //User.get({ id: userCode, pin: pinCode }, function (response) {
                //    $scope.user = response;
                //    dataIdService.setIDs(userCode, '', response.Token);
                //    //$rootScope.oauth.access_token = response.Token;
                //}, function (err) {
                //    if (err.statusText === 'Not Found') {
                //        alert("User is not found or pincode is wrong");
                //    }
                //    window.location = '#/';
                //});

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