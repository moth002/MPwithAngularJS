angular.module('myApp')
    .factory('footerBtnService', function() {
        var rightButton = {
            title: 'Next',
            isVisible: false,
            click: ''
        };
        var middleButton = {
            title: 'Next',
            isVisible: false,
            click: ''
        };

        return {
            getRight: function() {
                return rightButton;
            },
            setRight: function(t, s, c) {
                rightButton.title = t;
                rightButton.isVisible = s;
                rightButton.click = c;
            },
            getMiddle: function() {
                return middleButton;
            },
            setMiddle: function(t, s, c) {
                middleButton.title = t;
                middleButton.isVisible = s;
                middleButton.click = c;
            }
        }
    });