angular.module('ngWork')
    .factory('userService', function ($http) {
        var service = {};
        service.addUser = function (user) {
            $http.post('/user', user)
                .success(function (data) {
                    return data;
                })
                .error(function () {
                    return {err: '网络异常'}
                })
        };

        service.modUser = function (user) {
            $http.put('/user/' + user.id, user)
                .success(function (data) {
                    return data;
                })
                .error(function () {
                    return {err: '网络异常'}
                })
        };

        service.removeUser = function (id) {
            $http.delete('/user/' + id)
                .success(function (data) {
                    return data;
                })
                .error(function () {
                    return {err: '网络异常'}
                })
        };

        service.getUser = function (id) {
            $http.get('/user/' + id)
                .success(function(data){
                    return data;
                })
                .error(function(){
                    return {err: '网络异常'}
                })
        };

        return service;
    })