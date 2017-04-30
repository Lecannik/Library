/**
 * Created by Admin on 29.09.2016.
 */



angular.module('app').controller('HomeCtrl', function ($scope, $mdDialog, $ocLazyLoad, $cookies, $http) {







  var self = this;
  self.title = "Работа с главной страницей";



    self.selected = [];
  self.options = {
    rowSelection: true
  };


  self.data = [];





    $http.get("/books")
        .then(function(response) {
            self.data = response.data;
        });





    self.delete = function (selected) {

        console.log(selected);

        $http({
            url: '/book/' + selected[0].id,
            method: "DELETE"

        })
            .then(function(response) {

                    $http.get("/books")
                        .then(function(response) {
                            self.data = response.data;
                            self.selected = [];
                        });




                },
                function(response) {
                    console.log(response);
                });

    };



    self.update = function(ev, selected) {
        $mdDialog.show({
            controller: DialogControllerUpdate,
            templateUrl: 'resources/components/home/update_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };




    self.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'resources/components/home/dialog_template.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: true // Only for -xs, -sm breakpoints.
        });
    };



    function DialogControllerUpdate($scope, $mdDialog, $http) {


        $scope.userCategory = '';
        $scope.categorys = [{id: 0, name: "Сдать книгу"}, {id: 1, name: "Вернуть книгу"}];







        $scope.title = self.selected[0].name;
        $scope.text = self.selected[0].info;


        $scope.updateNew = function () {





            $http({
                url: '/book',
                method: "PUT",
                data: {'name': $scope.title, 'info': $scope.text, 'status': $scope.userCategory, 'id': self.selected[0].id}
            })
                .then(function(response) {
                        console.log(response);
                    },
                    function(response) {
                        console.log(response);
                    });



        };






        $scope.closeDialog = function () {



            $mdDialog.hide();



        };




    }




    function DialogController($scope, $mdDialog, $http) {







        $scope.save = function () {





            $http({
                url: '/addbook',
                method: "POST",
                data: {'name': $scope.title, 'info': $scope.text}
            })
                .then(function(response) {
                        console.log(response);
                    },
                    function(response) {
                        console.log(response);
                    });



        };






        $scope.closeDialog = function () {



            $mdDialog.hide();



        };




    }





});

