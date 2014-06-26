/**
 * Created by wing on 2014/6/16.
 */
var app = angular.module('azerpApp');
app.factory('userWorkOrderService', function(){

    return {
        addwo: function(userInfo){
            $http.post('/work_order', userInfo).success(function(data){

            }).error(function(){

            });
        }
    };
});