angular.module('ngWork')
    .factory('customerService', function($http){
        var service = {};
        service.addCustomer = function(customer){
            $http.post('/customer', customer)
                .success(function(data, status){
                    return data;
                })
                .error(function(){
                    return {err: "网络异常"}
                })
        }

        service.removeCustomer = function(customer){
            $http.post('/customer/' + customer.id)
                .success(function(data, status){
                    return data;
                })
                .error(function(){
                    return {err: "网络异常"}
                })
        }
        return service;
    })
