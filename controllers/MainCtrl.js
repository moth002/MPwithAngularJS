angular.module('myApp')
    .controller("MainCtrl", [
        '$scope', '$http', 'cordovaReady', 'footerBtnService', 'dataIdService', '$ionicModal', '$q',
        function ($scope, $http, cordovaReady, footerBtnService, dataIdService, $ionicModal, $q) {

            var defer = $q.defer();

            $scope.registration = {
                token: "",
                name: "",
                pinCode: "4321",
                barcode: "mo"
            };

            $scope.init = function () {
                //$http.post(window.apiUrl + 'UserLogon', $scope.registration).then(function(response) {
                //    alert('Hello');
                //});
                //var User = $resource(window.apiUrl + 'UserLogon');
                //User.get({ id: 'userCode', pin: 'pinCode' }, function (response) {
                //    //$scope.user = response;
                //    //dataIdService.setIDs(userCode, '', response.Token);
                //    //$rootScope.oauth.access_token = response.Token;
                //}, function (err) {
                //    if (err.statusText === 'Not Found') {
                //        alert("User is not found or pincode is wrong");
                //    }
                //    //window.location = '#/';
                //});
            }

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
                        defer.promise.then(function (pinCode) {
                            window.location = '#/user/' + result.text + '/pin/' + pinCode;
                        });
                    },
                    function(error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }

        }
    ]);