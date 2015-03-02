angular.module('myApp')
    .controller("PatientCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReady, dataIdService) {
            $scope.init = function () {
                var patientModel = {
                    nhi: $routeParams.barcode,
                    scheme: 'nhi'
                }
                var nhi = $routeParams.barcode;

                $scope.idList = dataIdService.getIDs();

                $http.post(window.apiUrl + 'GetPatientData', patientModel)
                    .success(function (response) {
                        $scope.patient = response;
                        dataIdService.setIDs($scope.idList.userId, nhi, $scope.idList.tokenId);
                    })
                    .error(function (err, status) {
                        if (status === 404)
                            alert("Pateint not found");
                        if (status === 400)
                            alert(err.message);
                        window.location = '#/';
                    });

                $http.get(window.apiUrl + 'GetUserData', { params: {id: $scope.idList.userId} }).success(function(result) {
                    $scope.user = result;
                });

                //var mPatient = $resource(window.apiUrl + 'GetPatientData/:patient');
                //var patient = mPatient.get({ patient: nhi, sch: 'NHI' }, function () {
                //    $scope.patient = patient;
                //}, function (err) {
                //    alert(err.status);
                //});

                //var User = $resource(window.apiUrl + 'GetUserAuthentication/:user');
                //var user = User.get({ user: $scope.idList.userId}, function () {
                //    $scope.user = user;
                //}, function (err) {
                //    alert(err.status);
                //});

                $scope.model = {
                    message: "Scan the order form or enter the order number"
                }

                footerBtnService.setRight('Next', true);
                footerBtnService.setMiddle('', false);
            }

            $scope.scanCode = function () {
                cordovaReady(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.userId = result.text;
                        window.location = '#/order/' + result.text;
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }
        }
    ]);