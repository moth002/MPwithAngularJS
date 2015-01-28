angular.module('myApp')
    .controller("FooterBtnCtrl", [
        '$scope', 'footerBtnService', 'dataIdService',
            function ($scope, footerBtnService, dataIdService) {
                $scope.idList = dataIdService.getIDs;

                $scope.buttonClicked = function () {
                    //window.location = '#/user/' + $scope.userId;
                    window.location = '#/user/928364829';
                }
                $scope.btnCancel = function () {
                    window.location = '#/';
                }

                $scope.rightButton = footerBtnService.getRight();
                $scope.middleButton = footerBtnService.getMiddle();
        }
    ]);