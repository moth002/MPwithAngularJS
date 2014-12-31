angular.module('myApp')
    .factory('FooterBtnService', function() {
        var rightButton = {
            title: 'Next',
            show: false
        };
        var middleButton = {
            title: 'Next',
            show: false
        };

        return {
            getRight: function() {
                return rightButton;
            },
            setRight: function(t, s) {
                rightButton.title = t;
                rightButton.show = s;
            },
            getMiddle: function() {
                return middleButton;
            },
            setMiddle: function(t, s) {
                middleButton.title = t;
                middleButton.show = s;
            }
        }
    });