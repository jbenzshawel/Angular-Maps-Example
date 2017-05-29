'use strict';

// Register `httpDemo` component, along with its associated controller and template
angular.
  module('httpDemo').
  component('httpDemo', {
    templateUrl: 'http-demo/http-demo.template.html',
    controller: ['$scope', 'Maps',
      function HttpDemoController($scope, Maps) {
        var self = this;

        $scope.address = null;
        
        $scope.city = null;
        
        $scope.state = null;
        
        $scope.postalCode = null;
        
        $scope.validAddress = false; 

        

        $scope.findAddress = function () {
          Maps.getAddressBing("US", $scope.searchPostal, $scope.searchAddress, function (res) {
            window.apiRes = res;        
            if (res != null && typeof (res) === "object" &&
              res.hasOwnProperty("status") && res.status === 200 &&
              res.hasOwnProperty("data") && res.data != null) {
                var address = res.data.resourceSets[0].resources[0].address;
                $scope.address = address.addressLine;
                $scope.city = address.locality;
                $scope.state = address.adminDistrict;
                $scope.postalCode = address.postalCode;

                if (res.data.resourceSets[0].resources[0].confidence === "High") {
                  $scope.validAddress = true;
                }
              }
            });
        } // end function $scope.findAddress
      } // end controller function 
    ] // end controller
  });
