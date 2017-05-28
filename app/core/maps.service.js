"use strict";

// register the `core.maps` module 
var mapsModule = angular.module('core.maps', []);

//////////////////////////////////////////////////////////
/// Factory Methods 
mapsModule.
  factory('Maps', ['$http',
    function($http) {
        ///////////////////////////////////////////////////////////////
        /// private props and methods 

        var _baseApiUrl = "http://dev.virtualearth.net/REST/v1/Locations?";

        var _bingApiKey =  "";

        // @param coutryRegion A string specifying the ISO country code. example AU
        // @param postalCode A string specifying the ISO country code. example 98178
        // @param addressLine A string specifying the street line of an address. example 1 Microsoft Way
        // @returns string Bing Maps REST Locations API endpoint with api key
        var _getRoute = function (countryRegion, postalCode, addressLine) {
            return _baseApiUrl + "countryRegion=" + countryRegion + "&postalCode=" + postalCode 
                    + "&addressLine=" + addressLine + "&key=" + _bingApiKey;
        }

        //////////////////////////////////////////////////////////////
        /// public props and methods
        var service = {};
        
        // @param coutryRegion A string specifying the ISO country code. example AU
        // @param postalCode A string specifying the ISO country code. example 98178
        // @param addressLine A string specifying the street line of an address. example 1 Microsoft Way
        // @param resCallback A callback function for api response 
        // @returns void
        service.getAddress = function (countryRegion, postalCode, addressLine, resCallback) {
            // Simple GET request example:
            try {
                $http({
                method: 'GET',
                url: _getRoute(countryRegion, postalCode, addressLine)
                }).then(resCallback, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.   
                }); 
            } catch (e) {
                console.warn(e);
            }
        }
        
        
        // @param coutryRegion A string specifying the ISO country code. example AU
        // @param postalCode A string specifying the ISO country code. example 98178
        // @param addressLine A string specifying the street line of an address. example 1 Microsoft Way
        // @returns 
        service.getAddressVer2 = function (countryRegion, postalCode, addressLine) {
            // Simple GET request example:
            $http({
            method: 'GET',
            url: _getRoute(countryRegion, postalCode, addressLine)
            });
        }
        return service;
    }
  ]);
