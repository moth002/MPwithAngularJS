angular.module('myApp')
    .controller("SideMenuBtnCtrl", [
        '$scope', 'cordovaReadyService', '$ionicSideMenuDelegate',
            function ($scope, cordovaReadyService, $ionicSideMenuDelegate) {

                $scope.ctlDeviceActive = {
                    value: true
                }

                $scope.deviceActiveChanged = function () {
                    // ------------------------------------------------------------------
                    // An alert to get the admin password
                    // A call to the WebServer to confirm the password
                    // and register or deregister a device.
                    // ------------------------------------------------------------------
                    alert("You have to be an admin");
                    $scope.ctlDeviceActive.value = true;
                }

                $scope.btnHome = function () {
                    $ionicSideMenuDelegate.toggleLeft();
                    window.location = '#/';
                };

                $scope.btnBluetooth = function () {
                    cordovaReadyService(bluetoothSerial.list(function (devices) {
                        if (devices != null) {
                            devices.forEach(function (device) {
                                alert(device.name);
                            });
                        } else {
                            alert("");
                        }
                        
                    }, function(reason) {
                        alert(reason);
                    }));
                };

            }
    ]);