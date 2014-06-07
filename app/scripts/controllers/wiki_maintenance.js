/**
 * Created by wing on 2014/6/3.
 */
var app = angular.module('azerpApp');
app.controller('WikiMaintenanceCtrl', function ($scope) {
    var data = [
        {
            name: "公司",
            depth: 0
        },
        {
            name: "财务部",
            depth: 1
        },
        {
            name: "客服部",
            depth: 1
        },
        {
            name: "vcc",
            depth: 2
        },
        {
            name: "技术部",
            depth: 1
        },
        {
            name: "创新组",
            depth: 2
        },
        {
            name: "闲人组",
            depth: 2
        },
        {
            name: "市场部",
            depth: 1
        },
        {
            name: "苏州",
            depth: 0
        },
        {
            name: "呼叫中心",
            depth: 1
        }
    ];

    $scope.treeFamily = {
        children: []
    };

    $scope.treeFamily = treeData(data);
});

app.directive("wtree", function (RecursionHelper) {
    return {
        restrict: "A",
        scope: {
            family: '='
        },
        controller: function ($scope, $rootScope) {
            $scope.a = function (name) {
                $rootScope.$broadcast('wiki_add', {node: name})
            }
        },
        templateUrl: 'wtree.html',
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


app.directive('wnode', function () {
        return {
            restrict: 'A',
            scope: {
                data: '='
            },
            controller: function ($scope, departmentService, $rootScope) {
                $scope.nodeAdd = function (atnode) {
                    departmentService.nodeAdd($scope.nodeName, atnode).then(function () {
                        $rootScope.$broadcast('wiki_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('wiki_error', data.err);
                    });
                };
                $scope.nodeAddChild = function (atnode) {
                    departmentService.nodeAddChild($scope.childName, atnode).then(function () {
                        $rootScope.$broadcast('wiki_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('wiki_error', data.err);
                    });
                };
                $scope.nodeRename = function (atnode) {
                    departmentService.nodeRename($scope.newName, atnode).then(function () {
                        $rootScope.$broadcast('wiki_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('wiki_error', data.err);
                    });
                };
                $scope.nodeRemove = function (atnode) {
                    departmentService.nodeRemove(atnode).then(function () {
                        $rootScope.$broadcast('wiki_tree', {});
                    }, function (data) {
                        $rootScope.$broadcast('wiki_error', data.err);
                    });
                };
            },
            templateUrl: 'wnode.html',
            link: function (scope, element) {
                element.find('>button').bind('click', function () {
                    $(this).next('.node-input').toggleClass('hide');
                    $(this).toggleClass('active').blur();
                })
            }
        }
    }
);
