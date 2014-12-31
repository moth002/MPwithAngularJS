angular.module("myApp", ['ionic', 'ngRoute'])

.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl"
    })
    .when("/user/:userId", {
        templateUrl: "views/user.html",
        controller: "UserCtrl"
    })
    .otherwise({
                    redirectTo: '/'
    });
}])




