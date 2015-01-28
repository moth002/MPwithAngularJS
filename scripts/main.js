angular.module("myApp", ['ionic', 'ngRoute', 'ngResource'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        //Hide the accessory bar by default (remove this to show the accesory bar above the keyborad
        // for form input)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl"
    })
    .when("/user/:barcode", {
        templateUrl: "views/user.html",
        controller: "UserCtrl"
    })
    .when("/patient/:barcode", {
        templateUrl: "views/patient.html",
        controller: "PatientCtrl"
    })
    .otherwise({
        redirectTo: '/'
    });
}])




