var app = angular.module("myApp", ['ngRoute']);

app.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "views/main.html",
        controller: "AppCtrl"
    });
    $routeProvider.when('/nurse', {
        templateUrl: "views/nurse.html"
    });
    //$routeProvider.otherwise({
    //                redirectTo: '/'
    //});
}]);

app.controller("AppCtrl", ['$scope', function ($scope) {
    $scope.model = {
        message: "Scan or enter your ID"
    }
}]);