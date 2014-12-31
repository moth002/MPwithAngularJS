angular.module('myApp')
    .controller("FooterBtnCtrl", [
        '$scope', 'FooterBtnService', function($scope, FooterBtnService) {

            $scope.buttonClicked = function() {
                window.location = '#/user/' + $scope.userId;
            }
            $scope.btnCancel = function() {
                window.location = '#/';
            }

            $scope.rightButton = FooterBtnService.getRight();
            $scope.middleButton = FooterBtnService.getMiddle();
        }
    ]);