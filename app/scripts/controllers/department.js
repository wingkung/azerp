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

    $scope.hasError = false;

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
        controller: function ($scope, departmentService) {
            $scope.nodeAdd = function (atnode) {
                departmentService.nodeAdd($scope.childName, atnode);
            };
            $scope.nodeAddChild = function (atnode) {
                departmentService.nodeAddChild($scope.childName, atnode);
            };
            $scope.nodeRename = function (atnode) {
                departmentService.nodeRename($scope.newName, atnode);
            }
        },
        templateUrl: 'dnode.html',
        link: function (scope, element) {
            element.find('button').bind('click', function () {
                $(this).next('.node-input').toggleClass('hide');
            })
        }
    }
})
function treeData(data) {
    var paths = [];
    for (var i in data) {
        var depth = data[i].depth;
        var path = [];
        paths.splice(depth + 1, paths.length - depth + 1)
        if (paths[depth] != undefined) {
            paths[depth] += 1;
        } else {
            paths[depth] = 0;
        }
        for (var j = 0; j < depth + 1; j++) {
            path.push(paths[j]);
        }
        data[i].path = path;
    }
    var tree = {children: []};

    for (var i in data) {
        var depth = data[i].depth;
        var path = data[i].path;
        var name = data[i].name;
        var child = tree;
        for (var j = 0; j < depth + 1; j++) {
            if (child.children[path[j]] == undefined) {
                child.children[path[j]] = {name: name, children: []};
            }
            child = child.children[path[j]];
        }
    }
    return tree;
}