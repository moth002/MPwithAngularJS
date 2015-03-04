angular.module('myApp')
    .controller("OrderCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReady, dataIdService) {
            $scope.init = function () {
                var orderModel = {
                    orderId: $routeParams.orderId
                }
                //var nhi = $routeParams.barcode;

                $scope.idList = dataIdService.getIDs();
                var patientModel = {
                    nhi: $scope.idList.patientId,
                    scheme: 'NHI'
                }

                $http.post(window.apiUrl + 'GetOrderData', orderModel)
                    .success(function (response) {
                        $scope.order = response;
                        dataIdService.setIDs($scope.idList.userId, $scope.idList.patientId, $scope.idList.tokenId);
                    })
                    .error(function (err, status) {
                        if (status === 404)
                            alert("Order mismatch");
                        if (status === 401)
                            alert("Unauthorized User");
                        window.location = '#/';
                    });

                $http.post(window.apiUrl + 'GetPatientData', patientModel).success(function (response) {
                    $scope.patient = response;
                });

                $http.get(window.apiUrl + 'GetUserData', { params: {id: $scope.idList.userId} }).success(function(result) {
                    $scope.user = result;
                });


                footerBtnService.setRight('Print Labels', true);
                footerBtnService.setMiddle('', false);
            }

            //$scope.scanCode = function () {
            //    cordovaReady(window.cordova.plugins.barcodeScanner.scan(
            //        function (result) {
            //            $scope.userId = result.text;
            //            window.location = '#/order/' + result.text;
            //        },
            //        function (error) {
            //            alert("Scanning failed: " + error);
            //        }
            //    ));
            //}
        }
    ]);