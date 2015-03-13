angular.module('myApp')
    .controller("PatientCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService', '$q',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReady, dataIdService, $q) {
            $scope.init = function () {
                var defer = $q.defer();

                footerBtnService.setRight('Next', true, '#/order/1858');
                footerBtnService.setMiddle('', false, '');

                defer.promise.then(function () {
                    cordovaReady(window.plugins.spinnerDialog.hide());
                });

                var patientModel = {
                    nhi: $routeParams.barcode,
                    scheme: 'nhi'
                }

                $scope.idList = dataIdService.getIDs();

                $http.post(window.apiUrl + 'GetPatientData', patientModel)
                    .success(function (response) {
                        $scope.patient = response;
                        dataIdService.setIDs($scope.idList.userId, patientModel.nhi, $scope.idList.tokenId);
                        defer.resolve();
                    })
                    .error(function (err, status) {
                        if (status === 404)
                            alert("Pateint not found");
                        if (status === 401)
                            alert("Unauthorized User");
                        defer.resolve();
                        window.location = '#/';
                    });

                $http.get(window.apiUrl + 'GetUserData', { params: {id: $scope.idList.userId} }).success(function(result) {
                    $scope.user = result;
                });

                $scope.model = {
                    message: "Scan the order form or enter the order number"
                }
            }

            $scope.scanCode = function () {
                cordovaReady(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.userId = result.text;
                        window.location = '#/order/' + result.text;
                        window.plugins.spinnerDialog.show(null, "Getting Data", true);
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }
        }
    ]);