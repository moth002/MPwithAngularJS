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
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "AppCtrl"
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

.controller("AppCtrl", ['$scope', function ($scope) {
    $scope.model = {
        message: "Scan or enter your ID"
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
