angular.module('myApp')
    .controller("CollectCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReadyService', 'globalIdService', '$q',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReadyService, globalIdService, $q) {
            $scope.init = function () {
                var defer = $q.defer();

                defer.promise.then(function () {
                    cordovaReadyService(window.plugins.spinnerDialog.hide());
                });

                $scope.idList = globalIdService.getIDs();

                var orderModel = {
                    orderId: $scope.idList.orderId,
                    patientId: $scope.idList.patientId
                }

                var patientModel = {
                    nhi: $scope.idList.patientId,
                    scheme: 'NHI'
                }

                $http.post(window.apiUrl + 'GetOrderData', orderModel)
                    .success(function (response) {
                        $scope.order = response;
                        globalIdService.setIDs($scope.idList.userId, $scope.idList.patientId, $scope.idList.orderId, $scope.idList.tokenId);
                        defer.resolve();
                    })
                    .error(function (err, status) {
                        if (status === 404)
                            alert("Order mismatch");
                        if (status === 401)
                            alert("Unauthorized User");
                        defer.resolve();
                        window.location = '#/';
                    });

                $http.post(window.apiUrl + 'GetPatientData', patientModel).success(function (response) {
                    $scope.patient = response;
                });

                $http.get(window.apiUrl + 'GetUserData', { params: {id: $scope.idList.userId} }).success(function(result) {
                    $scope.user = result;
                });

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

                footerBtnService.setRight('Complete', true, '#/collect');
                footerBtnService.setMiddle('', false, null);
                footerBtnService.setLeft(true);
            }
        }
    ]);