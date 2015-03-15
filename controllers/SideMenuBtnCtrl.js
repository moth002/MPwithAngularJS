angular.module('myApp')
    .controller("SideMenuBtnCtrl", [
        '$scope', 'cordovaReadyService', '$ionicSideMenuDelegate',
            function ($scope, cordovaReadyService, $ionicSideMenuDelegate) {

                $scope.btnHome = function () {
                    $ionicSideMenuDelegate.toggleLeft();
                    window.location = '#/';
                };

                $scope.btnBluetooth = function () {
                    cordovaReadyService(bluetoothSerial.list(function (devices) {
                        devices.forEach(function(device) {
                            alert(device.name);
                        });
                    }, function(reason) {
                        alert(reason);
                    }));
                };

            }
    ]);