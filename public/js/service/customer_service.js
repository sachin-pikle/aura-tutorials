'use strict';

angular.module('myApp').factory('CreditService', ['$http', '$q', function($http, $q){

  // var REST_SERVICE_URI = './creditscore';
  
  // Using Apiary Mock service
  var REST_SERVICE_URI = 'https://private-c03750-jscreditscore.apiary-mock.com/mikarinneoracle/creditscore';

  var factory = {
    creditScore: creditScore,
  };

  return factory;

  function creditScore(user) {
    var deferred = $q.defer();

    console.log("Calling " + REST_SERVICE_URI);
    console.log(user);
    
    $http.post(REST_SERVICE_URI, JSON.stringify(user))
        .then(
        function (response) {
            deferred.resolve(response.data);
            console.log("CALL OK");
            console.log(response.data);
        },
        function(errResponse){
            console.error('Error while determine credit score');
            deferred.reject(errResponse);
        }
    );
    return deferred.promise;
  }

}]);
