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

app.controller('ShopController', function ($scope, $http, CartService, $rootScope) {
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

    $scope.addToCart = function (ID_Product, ProductName, Image_url, Price, Quantity) {
        CartService.addToCart(ID_Product, ProductName, Image_url, Price, Quantity);
        $scope.cartInfor = CartService.getCartQuantity();
        alert('Sản phẩm đã được thêm vào giỏ hàng');
    };

    $rootScope.cartInfor = CartService.getCartQuantity();
});

app.controller('CheckoutController', function ($scope, $http) {

});

app.controller('LoginController', function ($scope, $http, UserService, $window) {
    $scope.Login = function(account, password) {
        var data = {
            account: account,
            password: password
        };
        $http.post(DOMAIN + "login/Process_Login", data).then(function(response){
            $scope.result = response.data;
            var user = $scope.result;
            if (user == 2)
                alert('Account or Password is wrong!!! Please check');
            else if (user == 0)
                alert('The Account is invalid !!! Please create a new account');
            else{
                alert('Logged in successfully');
                UserService.setUser(user.ID_User, user.Account, user.Password, user.Username ,user.Birthday, user.Address, user.DateCreate, user.ID_Authorize);
                $window.history.back();
            }
        });
    };
});

app.controller('ProductDetailController', function ($http, $routeParams, $scope, CartService, $rootScope) {
    var productID = $routeParams.id;
    $http.get(DOMAIN + 'ProductDetail/index/' + productID).then(function (response) {
        $scope.productid = response.data;
    });

    $scope.addToCart = function (ID_Product, ProductName, Image_url, Price, Quantity) {
        CartService.addToCart(ID_Product, ProductName, Image_url, Price, Quantity);
        $scope.cartInfor = CartService.getCartQuantity();
        alert('The product has been added to cart');
    };

    $rootScope.cartInfor = CartService.getCartQuantity();

});

app.controller('ProfileController', function ($scope, $http) {

});

app.controller('RegisterController', function ($scope, $http) {

});

app.controller('ShopCartController', function ($scope, $http, CartService) {
    $scope.cartProducts = CartService.getCartItems();

    $scope.cartInfor = CartService.getCartQuantity();

    $scope.totalPrice = CartService.getTotalPrice();

    $scope.removeFromCart = function (index) {
        CartService.removeFromCart(index);
        $scope.cartProducts = CartService.getCartItems();
        $scope.totalPrice = CartService.getTotalPrice();
        $scope.cartInfor = CartService.getCartQuantity();
    };

    $scope.updateProductInCart = function (index) {
        var product = $scope.cartProducts[index];
        CartService.updateProductInCart(index, product.Quantity);
        $scope.totalPrice = CartService.getTotalPrice();
    };

});

app.controller('HeadingPageController', function($scope, UserService){
    $scope.isUserLoggedIn = false;
    var user = UserService.getUser();
    if(user && user.Username){
        $scope.username = user.Username;
        $scope.isUserLoggedIn = true;
    }

    $scope.logout = function(){
        UserService.logout();
        $scope.isUserLoggedIn = false;
    }
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

app.directive('popub', function () {
    /*------------------
        Magnific
    --------------------*/
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
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

app.directive('productSlider', function () {
    return {
        link: function (scope, element, attrs) {
            $(element).owlCarousel({
                loop: false,
                margin: 0,
                items: 1,
                dots: false,
                nav: true,
                navText: ["<i class='arrow_carrot-left'></i>", "<i class='arrow_carrot-right'></i>"],
                smartSpeed: 1200,
                autoHeight: false,
                autoplay: false,
                mouseDrag: false,
                startPosition: 'URLHash'
            }).on('changed.owl.carousel', function (event) {
                var indexNum = event.item.index + 1;
                product_thumbs(indexNum);
            });

            function product_thumbs(num) {
                var thumbs = element[0].querySelectorAll('.product__thumb a');
                thumbs.forEach(function (e) {
                    e.classList.remove("active");
                    if (e.hash.split("-")[1] == num) {
                        e.classList.add("active");
                    }
                });
            }

            // Sử dụng event delegation để xử lý sự kiện click
            element.on('click', '.product__thumb a', function () {
                var indexNum = this.hash.split("-")[1];
                product_thumbs(indexNum);
            });
        }
    };
});

app.directive('quantityButtons', function () {
    return {
        link: function (scope, element, attrs) {
            var proQty = element;
            proQty.prepend('<span class="dec qtybtn">-</span>');
            proQty.append('<span class="inc qtybtn">+</span>');
            proQty.on('click', '.qtybtn', function () {
                var button = angular.element(this);
                var oldValue = button.parent().find('input').val();
                if (button.hasClass('inc')) {
                    var newVal = parseFloat(oldValue) + 1;
                } else {
                    // Don't allow decrementing below zero
                    if (oldValue > 0) {
                        var newVal = parseFloat(oldValue) - 1;
                    } else {
                        newVal = 0;
                    }
                }
                button.parent().find('input').val(newVal);
                scope.quantity = newVal; // Cập nhật giá trị của $scope.quantity
                scope.$apply(); // Áp dụng sự thay đổi giá trị vào scope
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
        controller: 'HeadingPageController'
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

//Service
app.service('CartService', function () {
    var cartItems = [];
    var cartQuantity = 0;
    this.addToCart = function (id, name, image, price, quantity) {
        var item = {
            ID_Product: id,
            NameProduct: name,
            Image_url: image,
            Price: price,
            Quantity: quantity
        };
        cartItems.push(item);
        cartQuantity += 1;
    };
    this.getCartItems = function () {
        return cartItems;
    };

    this.removeFromCart = function (index) {
        cartItems.splice(index, 1);
        cartQuantity -= 1;
    };

    this.updateProductInCart = function (index, quantity) {
        cartItems[index].Quantity = quantity;
    };

    this.getTotalPrice = function () {
        var totalPrice = 0;
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            totalPrice += item.Price * item.Quantity;
        }
        return totalPrice;
    };

    this.getCartQuantity = function () {
        return cartQuantity;
    };


});

app.service('UserService', function(){
    var user = {};

    this.setUser = function(id, account, password, username, birthday, address, datecreate, id_authorize){
            user.ID_User = id;
            user.Account = account;
            user.Password = password;
            user.Username = username;
            user.Birthday = birthday;
            user.Address = address;
            user.DateCreate = datecreate;
            user.ID_Authorize = id_authorize;
    };
    this.getUser = function(){
        return user;
    };

    this.logout = function(){
        user = {};
    }
});








