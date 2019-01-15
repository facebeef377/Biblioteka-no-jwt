var app = angular.module('app', ['ngRoute', 'ngStorage', 'filters']);

app.controller('appController', function ($rootScope, $scope, $http, $timeout, $filter, $location, $localStorage) {

  $rootScope.baseUrl = "http://localhost:8080";

  $scope.initVars_admin = function () {
    console.log("Library Init!");
    $scope.getBooks();
    $scope.getAuthors();
    $scope.getLeases();
  }

  //////////////////////////////////////////////
  //
  //      USER
  //
  //////////////////////////////////////////////

  $scope.user = {}; //Dane użytkownika

  $scope.setUser = function() {
    $scope.user = {
      name: "Konto1",
      type: "user",
      login: "user",
      id: 1
    }
  }
  
    $scope.setAdmin = function() {
    $scope.user = {
      name: "Admin",
      type: "admin",
      login: "admin",
      id: 2
    }
  }

  //////////////////////////////////////////////
  //
  //      BOOKS
  //
  //////////////////////////////////////////////
  $scope.books = []; //Lista książek
  $scope.book = {}; //Nowy obiekt - książka

  //Funkcja pobiera wszystkie dostępne książki
  $scope.getBooks = function () {
    $scope.clearMyFilter();

    var req = {
      method: 'POST',
      url: $scope.baseUrl + "/book/all"
    }

    $http(req).then(function (result) {
      console.log(result.data);
      $scope.books = result.data;
    });
  }

  $scope.addBook = function () {

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/book/add",
        data: $scope.book
      }

      $http(req).then(function (result) {
        console.log(result.data);
        if (result.data.Status == "OK") {
          $rootScope.showSuccessAlert("Zapisano");
          $scope.book = {};
          $location.path("/books");
          $scope.getBooks();
        } else {
          $rootScope.showErrorAlert("Błąd");
        }
      });
  }

  $scope.deleteBook = function (book) {

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/book/delete",
        data: {
          id: book.id
        }
      }

      $http(req).then(function (result) {
        console.log(result.data);
        if (result.data.Status == "OK") {
          $rootScope.showSuccessAlert("Usunięto");
          $scope.getBooks();
        } else {
          $rootScope.showErrorAlert("Błąd");
        }
      });
  }

  $scope.gotoEdit_book = function (book) {
    $location.path("/add_book");
    $scope.book = book;
  }

  $scope.clearBook = function () {
    $scope.book = {};
  }


  //////////////////////////////////////////////
  //
  //      AUTHORS
  //
  //////////////////////////////////////////////
  $scope.authors = []; //Lista autorów
  $scope.author = {}; //Nowy obiekt - autor

  //Funkcja pobiera wszystkich autorów
  $scope.getAuthors = function () {
      $scope.clearMyFilter();

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/author/all",
      }

      $http(req).then(function (result) {
        console.log(result.data);
        $scope.authors = result.data;
      });
  }

  $scope.addAuthor = function () {

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/author/add",
        data: $scope.author
      }

      $http(req).then(function (result) {
        console.log(result.data);
        if (result.data.Status == "OK") {
          $rootScope.showSuccessAlert("Zapisano");
          $scope.author = {};
          $location.path("/authors");
          $scope.getAuthors();
        } else {
          $rootScope.showErrorAlert("Błąd");
        }
      });
  }

  $scope.deleteAuthor = function (author) {

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/author/delete",
        data: {
          id: author.id
        }
      }

      $http(req).then(function (result) {
        console.log(result.data);
        if (result.data.Status == "OK") {
          $rootScope.showSuccessAlert("Usunięto");
          $scope.getAuthors();
        } else {
          $rootScope.showErrorAlert("Błąd");
        }
      });
  }

  $scope.gotoEdit_author = function (author) {
    $location.path("/add_author");
    $scope.author = author;
    delete $scope.author.books;
  }

  $scope.clearAuthor = function () {
    $scope.author = {};
  }

  //////////////////////////////////////////////
  //
  //      Leases
  //
  //////////////////////////////////////////////
  $scope.leases = []; //Lista wypożyczeń
  $scope.lease = {}; //Nowy obiekt - wypożyczenie

  //Funkcja pobiera wszystkich wypożyczeń
  $scope.getLeases = function () {
      $scope.clearMyFilter();

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/lease/all",
      }

      $http(req).then(function (result) {
        console.log(result.data);
        $scope.leases = result.data;
      });
  }

  $scope.addLease = function (book) {

      $scope.lease = {
        reader: {
          id: $scope.user.id
        },
        book: {
          id: book.id
        }
      }

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/lease/add",
        data: $scope.lease
      }

      $http(req).then(function (result) {
        console.log(result.data);
        if (result.data.Status == "OK") {
          $rootScope.showSuccessAlert("Wypożyczono");
          $scope.lease = {};
          $location.path("/leases");
          $scope.getBooks();
        } else {
          $rootScope.showErrorAlert("Błąd");
        }
      });
  }

  $scope.deleteLease = function (lease) {

      var req = {
        method: 'POST',
        url: $scope.baseUrl + "/lease/return",
        data: {
          id: lease.id
        }
      }

      $http(req).then(function (result) {
        console.log(result.data);
        if (result.data.Status == "OK") {
          $rootScope.showSuccessAlert("Usunięto");
          $scope.getLeases();
        } else {
          $rootScope.showErrorAlert("Błąd");
        }
      });
  }

  $scope.clearLease = function () {
    $scope.lease = {};
  }

  //////////////////////////////////////////////
  //
  //      Filter
  //
  //////////////////////////////////////////////

  $scope.propertyName = 'id';
  $scope.reverse = true;
  $scope.search = {};

  $scope.sortBy = function (propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

  $scope.filterMyData = function (input, searchParam) {

    if (searchParam == '')
      return true;

    if (input == null || input == undefined) {
      input = "";
    }

    return input.toLowerCase().indexOf(searchParam.toLowerCase()) >= 0;
  }

  $scope.clearMyFilter = function () {
    $scope.propertyName = 'id';
    $scope.reverse = true;
    $scope.search = {};
  }

});

angular.module('filters', []).filter('milisecondFilter', [function () {
  return function (number) {
    if (!angular.isUndefined(number)) {
      return Math.ceil(number / (1000 * 60 * 60 * 24));
    }
  };
}]);
