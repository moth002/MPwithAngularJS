angular.module('myApp')
    .controller("CollectCtrl", [
        '$scope', '$http', '$routeParams', 'footerBtnService', 'cordovaReadyService', 'globalIdService', '$q', '$ionicPopup',
        function ($scope, $http, $routeParams, footerBtnService, cordovaReadyService, globalIdService, $q, $ionicPopup) {
            $scope.init = function () {
                var defer = $q.defer();

                $scope.model = {
                    message: "Scan the collected and labelled samples",
                    chkboxSpecimens: []
                }

                defer.promise.then(function () {
                    cordovaReadyService(window.plugins.spinnerDialog.hide());

                    for (var i = 0; i < $scope.order.Specimens.length; i++) {
                        $scope.model.chkboxSpecimens.push({ name: $scope.order.Specimens[i], code: $scope.order.Barcodes[i], checked: '' });
                    }
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

                var rightButtonClick = function () {
                    $ionicPopup.prompt({
                        title: 'Date and Time',
                        template: 'Please confirm the date and time of the collection',
                        inputType: 'datetime-local',
                        inputPlaceholder: new Date(),
                        okType: 'button-footer'
                        //buttons: [
                        //    {
                        //        text: '<b>Ok</b>',
                        //        type: 'button-footer',
                        //        onTap: function(e) { return true; }
                        //    },
                        //    { text: 'Cancel', onTap: function(e) { return true; } }
                        //]
                    }).then(function (dateTime) {
                        if (dateTime) {
                            window.location = '#/complete';
                        }    
                    });
                };

                footerBtnService.setRight('Next', true, rightButtonClick);
                footerBtnService.setMiddle('', false, null);
                footerBtnService.setLeft(true);

            }

            

            $scope.showDatePicker = function() {
                datePicker.show(options, function (date) {
                    alert("date result " + date);
                });
            };

            $scope.scanCode = function () {
                cordovaReadyService(window.cordova.plugins.barcodeScanner.scan(
                    function (result) {
                        $scope.model.chkboxSpecimens.forEach(function(item) {
                            if (item.code === result.text) {
                                item.checked = 'checked';
                                $scope.$apply(); // refresh the $scope
                            }
                        });
                    },
                    function (error) {
                        alert("Scanning failed: " + error);
                    }
                ));
            }
        }
    ]);