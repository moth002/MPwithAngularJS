angular.module('myApp')
    .controller("FooterBtnCtrl", [
        '$scope', 'footerBtnService', 'dataIdService', 'cordovaReady',
            function ($scope, footerBtnService, dataIdService, cordovaReady) {

                $scope.idList = dataIdService.getIDs;

                $scope.buttonClicked = function () {
                    //window.location = '#/user/' + $scope.userId;
                    window.location = '#/user/MO/pin/4321';
                }

                function alertDismissed() {
                    // do something
                }

                $scope.btnCancel = function () {
                    cordovaReady(navigator.notification.alert(
                       'You are the winner!',  // message
                       alertDismissed,         // callback
                       'Game Over',            // title
                       'Done'                  // buttonName
                   ));
                    window.plugins.spinnerDialog.show(null, "Getting Data", true);
                    window.location = '#/';
                }

                $scope.rightButton = footerBtnService.getRight();
                $scope.middleButton = footerBtnService.getMiddle();
        }
    ]);