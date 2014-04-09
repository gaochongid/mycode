var app = angular.module('app', ['ngRoute', 'ngSanitize']);

app.config(function ($routeProvider) {
    
    $routeProvider
    .when('/', {
        templateUrl: 'views/sell.html',
        controller: 'SellCtrl'
    })
    .when('/sell', {
    	templateUrl: 'views/sell.html',
    	controller: 'SellCtrl'
    })
    .when('/caigou', {
    	templateUrl: 'views/caigou.html',
    	controller: 'CaiGouCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });

});