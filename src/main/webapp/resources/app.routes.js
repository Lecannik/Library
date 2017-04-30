/**
 * Created by Admin on 29.09.2016.
 */



app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('home');

  $stateProvider


      .state('main', {
        url: '/main',
        view: {

          templateUrl: 'main.html'

        }

      })



      .state('home', {
        url: '/home',
        templateUrl: 'resources/components/home/home.html'
      })
});