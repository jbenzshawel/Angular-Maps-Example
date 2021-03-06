"use strict";

// register the `core.maps` module 
var mapsModule = angular.module('core.maps', []);

//////////////////////////////////////////////////////////
/// Factory Methods 
mapsModule.
  factory('Maps', ['$http',
    function($http) {        
        var mapsAPI = new MapsAPI();

        //////////////////////////////////////////////////////////////
        /// public props and methods

        var service = {};
        
        service.getApiResult = function (res) {
            if (res != null && typeof (res) === "object" &&
              res.hasOwnProperty("status") && res.status === 200 &&
              res.hasOwnProperty("data") && res.data != null) {
                  return res;
              }
            
            return null;
        }

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
                url: mapsAPI.getBingRoute(countryRegion, postalCode, addressLine)
                }).then(resCallback, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.warn("Error from Bing maps API");
                    console.warn(response);   
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
                url: mapsAPI.getGoogleRoute(address)
                }).then(resCallback, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.warn("Error from Google Maps API.");
                    console.warn(response);   
                }); 
            } catch (e) {
                console.warn(e);
            }
        }

        return service;
    }
  ]);

var MapsAPI = function () {

    this.bingApiKey =  "Aptu50eoRkIJy-L2AgD0DQ-kGWB0sV1UCb_c1cAg1VnTaqcFpOm4sxbEn-bosvj-";

    this.googleApiKey = "AIzaSyBIxZoeuiX-_zNEIgC9z3hlEFCymWXCe7A";

    this.baseBingUrl = "http://dev.virtualearth.net/REST/v1/Locations?";    

    this.baseGoogleUrl = "https://maps.googleapis.com/maps/api/geocode/json?";

}

// @param coutryRegion A string specifying the ISO country code. example AU
// @param postalCode A string specifying the ISO country code. example 98178
// @param addressLine A string specifying the street line of an address. example 1 Microsoft Way
// @returns string Bing Maps REST Locations API endpoint with api key
MapsAPI.prototype.getBingRoute = function (countryRegion, postalCode, addressLine) {
    return this.baseBingUrl + "countryRegion=" + countryRegion + "&postalCode=" + postalCode 
            + "&addressLine=" + addressLine + "&key=" + this.bingApiKey;
}

MapsAPI.prototype.getGoogleRoute = function (address) {
    return this.baseGoogleUrl + "address=" + address + "&key=" + this.googleApiKey;
}
