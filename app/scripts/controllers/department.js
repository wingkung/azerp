var app = angular.module('azerpApp');
app.controller('DepartmentCtrl', function ($scope, departmentService, $log, $timeout) {

    $scope.treeFamily = {
        children: []
    };
    departmentService.getTree().then(function (data) {
        $scope.treeFamily = treeData(data);
    }, function (data) {
        $scope.error = '异常 ' + data.err;
    });

    $scope.$on('department_tree', function () {
        departmentService.getTree().then(function (data) {
            $scope.treeFamily = treeData(data);
        }, function (data) {
            $scope.error = '异常 ' + data.err;
        });
    });

    $scope.$on('department_error', function(event, data){
        console.log(data);
        $scope.error = data;
        $scope.hasError = true;
    });

    $scope.hideError = function(){
        $scope.hasError = false
    };
    $scope.hasError = false;

    /*$timeout(function(){
        $scope.checked = true;
    }, 2000)*/
});

app.directive("dtree", function (RecursionHelper) {
    return {
        restrict: "A",
        scope: {
            family: '='
        },
        controller: function ($scope, $rootScope) {
            $scope.a = function (name) {
                $rootScope.$broadcast('department_add', {node: name})
            }
        },
        templateUrl: 'dtree.html',
        compile: function (element) {
            return RecursionHelper.compile(element, function (scope, iElement, iAttrs, controller, transcludeFn) {
                // Define your normal link function here.
                // Alternative: instead of passing a function,
                // you can also pass an object with
                // a 'pre'- and 'post'-link function.
            });
        }
    };
});

app.directive('dnode', function () {
        return {
            restrict: 'A',
            scope: {
                data: '='
            },
            controller: function ($scope, departmentService, $rootScope) {
                $scope.nodeAdd = function (atnode) {
                    departmentService.nodeAdd($scope.nodeName, atnode).then(function () {
                        $rootScope.$broadcast('department_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('department_error', data.err);
                    });
                };
                $scope.nodeAddChild = function (atnode) {
                    departmentService.nodeAddChild($scope.childName, atnode).then(function () {
                        $rootScope.$broadcast('department_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('department_error', data.err);
                    });
                };
                $scope.nodeRename = function (atnode) {
                    departmentService.nodeRename($scope.newName, atnode).then(function () {
                        $rootScope.$broadcast('department_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('department_error', data.err);
                    });
                };
                $scope.nodeRemove = function (atnode) {
                    departmentService.nodeRemove(atnode).then(function () {
                        $rootScope.$broadcast('department_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('department_error', data.err);
                    });
                };
            },
            templateUrl: 'dnode.html',
            link: function (scope, element) {
                element.find('>button').bind('click', function () {
                    $(this).next('.node-input').toggleClass('hide');
                    $(this).toggleClass('active').blur();
                })
            }
        }
    }
);
