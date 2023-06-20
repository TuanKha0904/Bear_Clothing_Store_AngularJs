var index = angular.module('Home', []);

index.controller('CategoryWithCountProduct',function($scope, $http){
    $http.get("http://localhost:8080/Bear_Clothing_Store_API/index.php/home/Get_Category").then(function(response){
        $scope.categories = response.data;
    })
});