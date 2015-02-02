angular.module('myApp')
    .controller("MainCtrl", [
        '$scope', 'cordovaReady', 'footerBtnService', 'dataIdService', '$ionicModal', '$q',
        function ($scope, cordovaReady, footerBtnService, dataIdService, $ionicModal, $q) {

            var defer = $q.defer();

            $scope.passDots = '*';

            $scope.model = {
                message: "Scan or enter your ID"
            }

            $scope.idList = dataIdService.getIDs;

            footerBtnService.setRight('Next', true);
            //footerBtnService.setMiddle('Modal', true);

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
                animation: 'slide-in-up'
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

            $scope.scanCode = function() {

                cordovaReady(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.openModal();
                        defer.promise.then(function () {
                            window.location = '#/user/' + result.text;
                        });
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }

        }
    ]);