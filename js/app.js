var app = angular.module('MyApp', ['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '../Views/abc.html',
            controller: 'HomeController'
        })
        .when('/shop/:id', {
            template: '<shop></shop>',
        })
        .when('/product_detail', {
            templateUrl: '../Views/product_detail.html',
            controller: 'ProductDetailController'
        })
        .when('/shop_cart', {
            templateUrl: '../Views/shop_cart.html',
            controller: 'ShopCartController'
        })
        .when('/checkout', {
            templateUrl: '../Views/checkout.html',
            controller: 'CheckoutController'
        })
        .when('/register', {
            templateUrl: '../Views/register.html',
            controller: 'RegisterController'
        })
        .when('/login', {
            templateUrl: '../Views/login.html',
            controller: 'LoginController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

app.controller('HomeController',function($scope, $http){
    $http.get("https://tuankha.alwaysdata.net/index.php/shop/Get_Category").then(function(response){
        $scope.categories = response.data;
    })
});

app.directive('setbg', () => {
    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });
})

app.directive('shop', ()=>{
    return {
        restrict: 'E',
        templateUrl: '../Views/shop.html',
        bind: {
            obj: '='
        },
        controller: ($scope, $routeParams) => {
            console.log($routeParams.id);
            console.log($scope.obj);
        },
    }
})
