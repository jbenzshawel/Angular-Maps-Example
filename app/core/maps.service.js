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

        var _baseBingUrl = "http://dev.virtualearth.net/REST/v1/Locations?";

        var _bingApiKey =  "";

        var _googleApiKey = "";

        var _baseGoogleUrl = "https://maps.googleapis.com/maps/api/geocode/json?";

        // @param coutryRegion A string specifying the ISO country code. example AU
        // @param postalCode A string specifying the ISO country code. example 98178
        // @param addressLine A string specifying the street line of an address. example 1 Microsoft Way
        // @returns string Bing Maps REST Locations API endpoint with api key
        var _getBingRoute = function (countryRegion, postalCode, addressLine) {
            return _baseBingUrl + "countryRegion=" + countryRegion + "&postalCode=" + postalCode 
                    + "&addressLine=" + addressLine + "&key=" + _bingApiKey;
        }

        var _getGoogleRoute = function (address) {
            return _baseGoogleUrl + "location=" + address + "&key=" + _googleApiKey;
        }

        //////////////////////////////////////////////////////////////
        /// public props and methods

        var service = {};
        
        // @param coutryRegion A string specifying the ISO country code. example AU
        // @param postalCode A string specifying the ISO country code. example 98178
        // @param addressLine A string specifying the street line of an address. example 1 Microsoft Way
        // @param resCallback A callback function for api response 
        // @returns a Bing maps API json return model 
        service.getAddressBing = function (countryRegion, postalCode, addressLine, resCallback) {
            // Simple GET request example:
            try {
                $http({
                method: 'GET',
                url: _getBingRoute(countryRegion, postalCode, addressLine)
                }).then(resCallback, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.warn("Error from Bing maps API");
                    console.warn(res);   
                }); 
            } catch (e) {
                console.warn(e);
            }
        }
        
        // @param address A string street address that you want to geocode, in the format used by the national postal service of the country concerned
        // @returns a Google maps API json return model 
        service.getAddressGoogle = function (address, resCallback) {
            try {
                $http({
                method: 'GET',
                url: _getGoogleRoute(address)
                }).then(resCallback, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.warn("Error from Google Maps API.");
                    console.warn(res);   
                }); 
            } catch (e) {
                console.warn(e);
            }
        }

        return service;
    }
  ]);
