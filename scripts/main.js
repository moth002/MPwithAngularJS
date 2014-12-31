angular.module("myApp", ['ionic', 'ngRoute'])

//Add this to have access to a global variable
.run(function ($rootScope) {
    $rootScope.globalVariable = 'Amadou'; //global variable
})

.factory('RightButton', function () {
    return {
        text: "Next"
    };
})

.factory('BtnServices', function() {
    var rightButton = {
        title: 'Next',
        show: false
    };
    
    return {
        getRight: function() {
            return rightButton;
        },
        setRight: function(t, s){
            rightButton.title = t;
            rightButton.show = s;
        }
    }
})

.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl"
    })
    .when("/nurse/:nurseId", {
        templateUrl: "views/nurse.html",
        controller: "NurseCtrl"
    })
    .otherwise({
                    redirectTo: '/'
    });
}])

.controller("MainCtrl", ['$scope', 'BtnServices', function ($scope, BtnServices) {
    $scope.model = {
        message: "Scan or enter your ID"
    }

    BtnServices.setRight('Next', true);
    
    $scope.scanCode = function() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                $scope.nurseId = result.text;
                window.location = '#/nurse/' + result.text;
                //alert("We got a barcode\n" +
                //    "Result: " + result.text + "\n" +
                //    "Format: " + result.format + "\n" +
                //    "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }

    //$scope.$on("$viewContentLoaded", function () {
    //    $("#mainDiv").trigger("create");
    //});

}])

.controller("BtnCtrl", ['$scope', 'BtnServices', function ($scope, BtnServices) {

    $scope.buttonClicked = function () {
        window.location = '#/nurse/' + $scope.nurseId;
    }
    $scope.btnCancel = function () {
        window.location = '#/';
    }

    $scope.rightButton = BtnServices.getRight();
}])

.controller("NurseCtrl", ['$scope', function ($scope) {
    $scope.model = {
        message: "Scan the patient's wristband or enter the NHI"
    }

    $scope.scanCode = function () {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                window.location = '#/order/' + result.text;
                //alert("We got a barcode\n" +
                //    "Result: " + result.text + "\n" +
                //    "Format: " + result.format + "\n" +
                //    "Cancelled: " + result.cancelled);
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );
    }
}])
