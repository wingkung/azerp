var app = angular.module('azerpApp');

app.factory('departmentService', function($http, $q, API){
    return {
        nodeAddChild: function(node, atnode){
            var defered = $q.defer();
            $http.post(API.url + 'api/department', {node: node, atnode: atnode, isChild: 1})
                .success(function(data){
                    if (data.err){
                        defered.reject({err: data.err});
                    }else{
                        defered.resolve(data.data);
                    }
                })
                .error(function(data, status){
                    defered.reject({err: status});
                });
            return defered.promise;
        },
        nodeAdd: function(node, atnode){
            var defered = $q.defer();
            $http.post(API.url + 'api/department', {node: node, atnode: atnode, isChild: 0})
                .success(function(data){
                    if (data.err){
                        defered.reject({err: data.err});
                    }else{
                        defered.resolve(data.data);
                    }
                })
                .error(function(data, status){
                    defered.reject({err: status});
                });
            return defered.promise;
        },
        nodeRename: function(node, atnode){
            var defered = $q.defer();
            $http.put(API.url + 'api/department', {node: node, atnode: atnode})
                .success(function(data){
                    if (data.err){
                        defered.reject({err: data.err});
                    }else{
                        defered.resolve(data.data);
                    }
                })
                .error(function(data, status){
                    defered.reject({err: status});
                });
            return defered.promise;
        },
        nodeRemove: function(atnode){
            var defered = $q.defer();
            $http.delete(API.url + 'api/department', {atnode: atnode})
                .success(function(data){
                    if (data.err){
                        defered.reject({err: data.err});
                    }else{
                        defered.resolve(data.data);
                    }
                })
                .error(function(data, status){
                    defered.reject({err: status});
                });
            return defered.promise;
        },
        getTree: function(){
            var defered = $q.defer();
            $http.get(API.url + 'api/department')
                .success(function(data){
                    if (data.err){
                        defered.reject({err: data.err});
                    }else{
                        defered.resolve(data.data);
                    }
                })
                .error(function(data, status){
                    defered.reject({err: status});
                });

            return defered.promise;
        }
    }
});