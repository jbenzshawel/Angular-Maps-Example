'use strict';

// Register `httpDemo` component, along with its associated controller and template
angular.
  module('httpDemo').
  component('httpDemo', {
    templateUrl: 'http-demo/http-demo.template.html',
    controller: ['$scope', 'Maps',
      function HttpDemoController($scope, Maps) {

        var self = this;

        $scope.addressBing = null;
        
        $scope.cityBing = null;
        
        $scope.stateBing = null;
        
        $scope.postalCodeBing = null;
        
        $scope.validAddressBing = false; 

        $scope.formattedAddressGoogle = null;
        
        $scope.validAddressGoogle = false; 

        $scope.findAddress = function () {
          Maps.getAddressBing("US", $scope.searchPostal, $scope.searchAddress, function (res) {        
             var apiResult = Maps.getApiResult(res);

             if (apiResult != null) {
                var address = apiResult.data.resourceSets[0].resources[0].address;
                $scope.addressBing = address.addressLine;
                $scope.cityBing = address.locality;
                $scope.stateBing = address.adminDistrict;
                $scope.postalCodeBing = address.postalCode;

                if (res.data.resourceSets[0].resources[0].confidence === "High") {
                  $scope.validAddressBing = true;
                }
              } // end if apiResult != null
            });

            Maps.getAddressGoogle($scope.searchAddress + "+" + $scope.searchPostal, function (res) {
              var apiResult = Maps.getApiResult(res);

              if (apiResult != null) {
                $scope.formattedAddressGoogle = apiResult.data.results[0].formatted_address;

                if ($scope.formattedAddressGoogle != null) {
                  $scope.validAddressGoogle = true;
                }
              } // end if apiResult != null
            });            
        } // end function $scope.findAddress
      } // end controller function 
    ] // end controller
  });
