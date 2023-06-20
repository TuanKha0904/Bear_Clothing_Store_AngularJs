const DOMAIN = 'https://tuankha.alwaysdata.net/index.php/';

var app = angular.module('MyApp', ['ngRoute']);

//config
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: './Views/home.html',
            controller: 'HomeController'
        })
        .when('/shop', {
            template: '<shop></shop>',
            controller: 'ShopController'
        })
        .when('/checkout', {
            template: '<checkout></checkout>',
            controller: 'CheckoutController'
        })
        .when('/login', {
            template: '<login></login>',
            controller: 'LoginController'
        })
        .when('/product_detail/:id', {
            template: '<productdetail></productdetail>',
            controller: 'ProductDetailController'
        })
        .when('/profile ', {
            template: '<profile></profile>',
            controller: 'ProfileController'
        })
        .when('/register', {
            template: '<register></register>',
            controller: 'RegisterController'
        })
        .when('/shop_cart', {
            template: '<shopcart></shopcart>',
            controller: 'ShopCartController'
        })
        .otherwise({
            redirectTo: '/'
        });
});

// controller
app.controller('HomeController', function ($scope, $http) {
    $http.get(DOMAIN + 'Home/Get_Category').then(function (response) {
        $scope.categories = response.data;
    })
});

app.controller('ShopController', function ($scope, $http) {
    $scope.currentPage = 1;
    $scope.itemsPerPage = 6;
    $scope.categories = [];
    $scope.categoriesproducts = [];

    $scope.Init = function () {
        // lấy các category
        $http.get(DOMAIN + "shop/Get_Category").then(function (response) {
            $scope.categories = response.data;
        });

        // Lấy tất cả sản phẩm
        $http.get(DOMAIN + "shop/Get_Product").then(function (response) {
            $scope.categoriesproducts = response.data;
        });
    };

    $scope.Init();

    $scope.All = function () {
        $http.get(DOMAIN + "shop/Get_Product").then(function (response) {
            $scope.categoriesproducts = response.data;
        });
    };

    $scope.CategoryProduct = function (ID_Category) {
        $http.get(DOMAIN + "shop/Get_Category_Product/" + ID_Category).then(function (response) {
            $scope.categoriesproducts = response.data;
        });
    };

    $scope.getCurrentPageProducts = function () {
        var startIndex = ($scope.currentPage - 1) * $scope.itemsPerPage;
        var endIndex = startIndex + $scope.itemsPerPage;
        return $scope.categoriesproducts.slice(startIndex, endIndex);
    };

    $scope.getTotalPages = function () {
        return Math.ceil($scope.categoriesproducts.length / $scope.itemsPerPage);
    };

    $scope.getPageNumbers = function () {
        var totalPages = $scope.getTotalPages();
        var pageNumbers = [];
        for (var i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    $scope.gotoPage = function (page) {
        if (page >= 1 && page <= $scope.getTotalPages()) {
            $scope.currentPage = page;
        }
    };

    $scope.showPagination = function () {
        return $scope.getTotalPages() > 1;
    };
});

app.controller('CheckoutController', function ($scope, $http) {

});

app.controller('LoginController', function ($scope, $http) {

});

app.controller('ProductDetailController', function ($scope, $http, $routeParams) {
    var productID = $routeParams.id;
    $http.get(DOMAIN + 'ProductDetail/index/' + productID).then(function (response) {
        $scope.product = response.data;
    });
});

app.controller('ProfileController', function ($scope, $http) {

});

app.controller('RegisterController', function ($scope, $http) {

});

app.controller('ShopCartController', function ($scope, $http) {

});

// directive
app.directive('setbg', function () {
    /*------------------
        Background Set
    --------------------*/
    return {
        link: function (scope, element, attrs) {
            element.css('background-image', 'url(' + attrs.setbg + ')');
        }
    };
});

app.directive('banner', () => {
    /*--------------------------
        Banner Slider
    ----------------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).owlCarousel({
                loop: true,
                margin: 0,
                items: 1,
                dots: true,
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: true
            });
        }
    };
});

app.directive('popub', function() {
    /*------------------
        Magnific
    --------------------*/
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          element.on('click', function() {
            var imageUrl = attrs.href;
            $.magnificPopup.open({
              type: 'image',
              items: {
                src: imageUrl
              },
              mainClass: 'mfp-with-zoom',
              zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out'
              }
            });
          });
        }
      };
});

app.directive('shop', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/shop.html',
    };
});

app.directive('headingPage', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/header.html',
    }
});

app.directive('footerPage', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/footer.html',
    }
});

app.directive('checkout', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/checkout.html',
    }
});

app.directive('login', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/login.html',
    }
});

app.directive('productdetail', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/product_detail.html',
    }
});

app.directive('profile', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/profile.html',
    }
});

app.directive('register', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/register.html',
    }
});

app.directive('shopcart', () => {
    return {
        restrict: 'E',
        templateUrl: './Views/shop_cart.html',
    }
});








