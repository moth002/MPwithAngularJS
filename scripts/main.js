﻿angular.module("myApp", ['ionic', 'ngRoute', 'ngResource'])

    .run(['$ionicPlatform', 'globalIdService', '$injector', 'cordovaReadyService', function ($ionicPlatform, globalIdService, $injector, cordovaReadyService) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordovaReadyService(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true));
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                //StatusBar.styleDefault();
                StatusBar.hide();
            }
            ionic.Platform.isFullScreen = true;
        });

        // Override the transform Request, $injector get the object
        $injector.get("$http").defaults.transformRequest = function (data, headersGetter) {
            var idList = globalIdService.getIDs();
            headersGetter()['Authorization'] = idList.tokenId;
            if (data) // original or base transformRequest
                return angular.toJson(data);
        };
    }])

    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "views/main.html",
            controller: "MainCtrl"
        })
        .when("/user/:usercode/pin/:pincode", {
            templateUrl: "views/user.html",
            controller: "UserCtrl"
        })
        .when("/patient/:barcode", {
            templateUrl: "views/patient.html",
            controller: "PatientCtrl"
        })
        .when("/order/:orderId", {
            templateUrl: "views/order.html",
            controller: "OrderCtrl"
        })
        .otherwise({
            redirectTo: '/'
        });
    }])




