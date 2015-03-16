angular.module('myApp')
    .controller("OrderCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReadyService', 'globalIdService', '$q',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReadyService, globalIdService, $q) {
            $scope.init = function () {
                var defer = $q.defer();

                footerBtnService.setRight('Next', true, '#/order/1858');
                footerBtnService.setMiddle('Print Labels', true, '');
                footerBtnService.setLeft(true);

                defer.promise.then(function () {
                    cordovaReadyService(window.plugins.spinnerDialog.hide());
                });

                $scope.idList = globalIdService.getIDs();

                var orderModel = {
                    orderId: $routeParams.orderId,
                    patientId: $scope.idList.patientId
                }

                var patientModel = {
                    nhi: $scope.idList.patientId,
                    scheme: 'NHI'
                }

                $http.post(window.apiUrl + 'GetOrderData', orderModel)
                    .success(function (response) {
                        $scope.order = response;
                        globalIdService.setIDs($scope.idList.userId, $scope.idList.patientId, $scope.idList.tokenId);
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
            }
        }
    ]);