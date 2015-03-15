angular.module('myApp')
    .controller("MainCtrl", [
        '$scope', '$http', 'cordovaReadyService', 'footerBtnService', 'globalIdService', '$ionicModal', '$q',
        function ($scope, $http, cordovaReadyService, footerBtnService, globalIdService, $ionicModal, $q) {

            var defer = $q.defer();

            $scope.init = function () {
                footerBtnService.setRight('Next', true, '#/user/MO/pin/4321');
                footerBtnService.setMiddle('', false, '');
            }

            $scope.passDots = '*';

            $scope.model = {
                message: "Scan or enter your ID"
            }

            $scope.idList = globalIdService.getIDs;

            $scope.initModal = function () {
                $scope.passcode = "";
            }

            $scope.add = function (value) {
                if ($scope.passcode.length < 4) {
                    $scope.passcode = $scope.passcode + value;
                    if ($scope.passcode.length === 4) {
                        $scope.closeModal();
                    }
                }
            }

            $scope.delete = function () {
                if ($scope.passcode.length > 0) {
                    $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
                }
            }

            $ionicModal.fromTemplateUrl('Pincode-modal.html', {
                scope: $scope,
                backdropClickToClose: false,
                hardwareBackButtonClose : false
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.openModal = function () {
                $scope.modal.show();
            };

            $scope.closeModal = function () {
                $scope.modal.hide();
                defer.resolve($scope.passcode);
            };

            $scope.goHome = function () {
                $scope.modal.hide();
                $scope.passcode = "";
                window.location = "#/";
            };

            $scope.$on('$destroy', function () {
                $scope.modal.remove();
            });

            $scope.scanCode = function () {
                cordovaReadyService(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.openModal();
                        defer.promise.then(function (pinCode) {
                            window.location = '#/user/' + result.text + '/pin/' + pinCode;
                            window.plugins.spinnerDialog.show(null, "Getting Data", true);
                        });
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }

        }
    ]);