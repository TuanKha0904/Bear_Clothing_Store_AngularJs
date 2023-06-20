var shop = angular.module('Shop', []);

shop.controller('CategoryProduct', function ($scope, $http, $location) {

    $scope.currentPage = 1;
    $scope.itemsPerPage = 6;
    $scope.categories = [];
    $scope.categoriesproducts = [];

    $scope.Init = function () {
        // lấy các category
        $http.get("http://localhost:8080/Bear_Clothing_Store_API/index.php/shop/Get_Category").then(function (response) {
            $scope.categories = response.data;
        });

        // Lấy tất cả sản phẩm
        $http.get("http://localhost:8080/Bear_Clothing_Store_API/index.php/shop/Get_Product").then(function (response) {
            $scope.categoriesproducts = response.data;
        });
    };

    $scope.Init();

    $scope.All = function () {
        $http.get("http://localhost:8080/Bear_Clothing_Store_API/index.php/shop/Get_Product").then(function (response) {
            $scope.categoriesproducts = response.data;
        });
    };

    $scope.CategoryProduct = function (ID_Category) {
        $http.get("http://localhost:8080/Bear_Clothing_Store_API/index.php/shop/Get_Category_Product/" + ID_Category).then(function (response) {
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

    $scope.gotoProductDetail = function(ID_Product){
        $location.path('/product_detail/' + ID_Product);
    };
});