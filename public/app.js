var app = angular.module("app", ['ngMaterial', 'ngMessages', 'ngRoute', 'app1']);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'templates/calendar.html',
            controller: 'CalendarCtrl'
        })
        .when('/create', {
            templateUrl: 'templates/createForm.html',
            controller: 'registerController'
        })
        .when('/calendar', {
            templateUrl: 'templates/calendar.html',
            controller: 'CalendarCtrl'
        });
});

app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

app.controller("registerController", ["$scope", "$http", function ($scope, $http) {
    $scope.adData = {};
    console.log($scope.adData);
    $scope.saveAd = function () {

        $scope.adData.start = $scope.adData.start.getTime();
        $scope.adData.end = $scope.adData.end.getTime();

        $http.post("/queryTime", $scope.adData).then(function (response) {
            if (response.data === "Number already exists") {
                alert("Already  Exits")
            } else {
                $http.post("/saveAd", $scope.adData).then(function (response) {
                    if (response.status === 200) {
                        alert("saved  successfully")
                    } else {
                        alert("problem")
                    }
                });
            }
        });

    }
}]);