/**
 * Created by Admin on 29.09.2016.
 */



var app = angular.module('app', ['ngMaterial', 'ui.router', 'oc.lazyLoad', 'md.data.table', 'ngMessages', 'ngResource', 'ngCookies' ], function ($httpProvider) {


// Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];


}).config(['$ocLazyLoadProvider', '$qProvider', function($ocLazyLoadProvider, $qProvider) {
  $ocLazyLoadProvider.config({
    debug: true
  });




}]);




app.directive('ngFiles', ['$parse', function ($parse) {

  function fn_link(scope, element, attrs) {
    var onChange = $parse(attrs.ngFiles);
    element.on('change', function (event) {
      onChange(scope, { $files: event.target.files });
    });
  };

  return {
    link: fn_link
  }
} ]);



app.controller('MainCtrl', function ($scope, $location) {





  var path = $location.path();





  $scope.datalists = [
    { "name": "Главная", "icon": "home", "href": "home", path: "/home"}

  ];

  $scope.select= function(item) {


    $scope.selected = item;
  };

  $scope.isActive = function(item) {
    return $scope.selected === item;
  };




  $scope.datalists.forEach(function (item, index) {



    if (path === item.path || path === '') {


      $scope.select($scope.datalists[index]);

    }

  });





















});


