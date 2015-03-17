angular.module('myApp')
    .controller("SideMenuBtnCtrl", [
        '$scope', 'cordovaReadyService', '$ionicSideMenuDelegate', 'globalIdService',
            function ($scope, cordovaReadyService, $ionicSideMenuDelegate, globalIdService) {

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
                    cordovaReadyService(window.bluetoothSerial.list(function (devices) {
                        if (devices != null) {
                            devices.forEach(function (device) {
                                alert(device.name);
                                // --------------------------------------------------------
                                // this should be refactored
                                globalIdService.setPrinter(device.id);
                                // --------------------------------------------------------
                                //labelPrintService.print(device.id);
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