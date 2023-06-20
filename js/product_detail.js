var ProductDetail = angular.module('ProductDetail', ['ngRoute']);

ProductDetail.config(function($routeProvider){
    $routeProvider.when('product_detail/:ID_Product',{
        templateUrl: 'product_detail.html',
        controller: 'ProductDetailController'
    })
    .otherwise({
        redirectTo: '/'
    });
});

ProductDetail.controller('ProductDetailController', function($scope, $http, $routeParams){
    var ID_Product = $routeParams.ID_Product;
    $http.get("http://localhost:8080/Bear_Clothing_Store_API/index.php/product_detail/index/" + ID_Product).then(function(response){
        $scope.productDetail = response.data;
    });
});