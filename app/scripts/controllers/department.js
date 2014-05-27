var app = angular.module('azerpApp');
app.controller('DepartmentCtrl', function ($scope, $log) {

    $scope.treeFamily = {
        children: []
    };


    var data = [
        {name: '电器', depth:0}, //[0]
        {name: '冰箱', depth:1}, //[0,0]
        {name: '双门', depth:2}, //[0,0,0]
        {name: '单门', depth:2}, //[0,0,1]
        {name: '电视', depth:1}, //[0,1]
        {name: '等离子', depth:2} //[0,1,0]
    ]

    $scope.treeFamily = treeData(data);

    $scope.$on('department_add', function(event, data){
        console.log(data);
    })

});

app.directive("dtree", function (RecursionHelper) {
    return {
        restrict: "A",
        scope: {
            family: '='
        },
        controller: function($scope, $rootScope){
            $scope.a = function(name){
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


function treeData(data){
    var paths = [];
    for (var i in data){
        var depth = data[i].depth;
        var path = [];
        paths.splice(depth + 1, paths.length - depth + 1)
        if (paths[depth] != undefined){
            paths[depth] += 1;
        }else{
            paths[depth] = 0;
        }
        for(var j =0 ; j < depth + 1; j++){
            path.push(paths[j]);
        }
        data[i].path = path;
    }
    var tree = {children:[]};

    for (var i in data){
        var depth = data[i].depth;
        var path = data[i].path;
        var name = data[i].name;
        var child = tree;
        for (var j=0; j<depth + 1; j++){
            if (child.children[path[j]] == undefined){
                child.children[path[j]] = {name: name, children:[]};
            }
            child = child.children[path[j]];
        }
    }
    return tree;
}