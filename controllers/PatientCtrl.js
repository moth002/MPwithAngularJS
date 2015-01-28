angular.module('myApp')
    .controller("PatientCtrl", [
        '$scope', '$resource', '$routeParams', 'footerBtnService', 'cordovaReady', 'dataIdService',
        function ($scope, $resource, $routeParams, footerBtnService, cordovaReady, dataIdService) {
            $scope.init = function () {
                var patientId = $routeParams.barcode;

                $scope.idList = dataIdService.getIDs();

                var mPatient = $resource(window.apiUrl + 'api/patient/:patientId', { patientId: '@id' });
                var patient = mPatient.get({ patientId: patientId }, function () {
                    $scope.patient = patient;
                }, function (err) {
                    alert(err.status);
                });

                var User = $resource(window.apiUrl + 'api/user/:userId', { userId: '@id' });
                var user = User.get({ userId: $scope.idList.userId }, function () {
                    $scope.user = user;
                }, function (err) {
                    alert(err.status);
                });
                $scope.model = {
                    message: "Scan the order form or enter the order number",
                    show: $scope.idList.userId
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