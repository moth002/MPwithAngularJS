angular.module('myApp')
    .controller("FooterBtnCtrl", [
        '$scope', 'footerBtnService', 'dataIdService',
            function ($scope, footerBtnService, dataIdService) {
                $scope.idList = dataIdService.getIDs;

                $scope.btnCancel = function() {
                    window.location = '#/';
                }

                $scope.rightButton = footerBtnService.getRight();
                $scope.middleButton = footerBtnService.getMiddle();
        }
    ]);