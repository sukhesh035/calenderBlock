var app = angular.module("app", ['ngMaterial', 'ngMessages', 'ngRoute','app1']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'templates/createForm.html'
        })
        .when('/create', {
            templateUrl: 'templates/createForm.html',
            controller: 'registerController'
        })
        .when('/calendar', {
            templateUrl: 'templates/calendar.html',
            controller:'CalendarCtrl'
        });
});

app.controller("registerController", ["$scope", "$http", function ($scope, $http) {
    $scope.adData = {};
    $scope.saveAd = function () {
        $http.post("/saveAd", $scope.adData).then(function (response) {
            console.log(response);
        });
    }
}]);