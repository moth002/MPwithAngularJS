﻿angular.module('myApp')
    .controller("UserCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReadyService', 'globalIdService', '$q', '$ionicPopup',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReadyService, globalIdService, $q, $ionicPopup) {
            $scope.init = function () {
                var defer = $q.defer();

                var rightButtonClick = function () { window.location = '#/patient/I0I0039' };

                footerBtnService.setRight('Next', true, rightButtonClick);
                footerBtnService.setMiddle('', false, null);
                footerBtnService.setLeft(true);

                defer.promise.then(function() {
                    cordovaReadyService(window.plugins.spinnerDialog.hide());
                });

                var userModel = {
                    barcode: $routeParams.usercode,
                    pincode: $routeParams.pincode
                }

                $http.post(window.apiUrl + 'UserLogon', userModel)
                    .success(function(response) {
                        $scope.user = response;
                        globalIdService.setIDs(userModel.barcode, '', '', response.Token);
                        defer.resolve();
                    })
                    .error(function (err, status) {
                        defer.resolve();
                        if (status === 404){
                            $ionicPopup.alert({
                                template: "<img src='./images/usercodeAndPin-Warning.png' style='max-width: 100%; max-height: 100%;' />",
                                okType: 'button-footer'
                            }).then(function () {
                                window.location = '#/';
                            });
                        } else {
                            $ionicPopup.alert({
                                template: err.Message,
                                okType: 'button-footer'
                            }).then(function () {
                                window.location = '#/';
                            });
                        }                   
                    });

                $scope.model = {
                    message: "Scan the patient's wristband or enter the NHI"
                }
            }

            $scope.scanCode = function () {
                cordovaReadyService(window.cordova.plugins.barcodeScanner.scan(
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