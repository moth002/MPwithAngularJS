angular.module("myApp", ['ionic', 'ngRoute'])

//.config(function ($compileProvider) {
//    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//})

//.run(function ($ionicPlatform) {
//    $ionicPlatform.ready(function () {
//        if (window.StatusBar) {
//            // org.apache.cordova.statusbar required
//            StatusBar.styleDefault();
//        }
//    });
//})

.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/:nid?", {
        templateUrl: "views/main.html",
        controller: "MainCtrl"
    });
    $routeProvider.when("/nurse", {
        templateUrl: "views/nurse.html",
        controller: "NurseCtrl"
    });
    $routeProvider.otherwise({
                    redirectTo: '/'
    });
}])


//app.controller("MainCtrl", ['$scope', function ($scope) {
//    alert("Hello");
//    $scope.$on("$includeContentLoaded", function () {
//        $("#mainDiv").trigger("create");
//    });
//}]);

.controller("MainCtrl", ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.model = {
        message: "Scan or enter your ID"
    }
    $scope.nurseId = $routeParams.nid ? $routeParams.nid : "";
    
    $scope.scanCode = function() {
        cordova.plugins.barcodeScanner.scan(
            function (result) {
                window.location = '#/' + result.text;
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


//.controller("NurseCtrl", ['$scope', function ($scope) {
//    $scope.model = {
//        message: "Scan the patient's wristband or enter the NHI"
//    }
//}]);
