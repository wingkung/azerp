var app = angular.module('azerpApp');
app.controller('DepartmentCtrl', function ($scope, $timeout) {
    //console.log($scope);
    $scope.treeFamily = {
        children: [
            {name: "Parent",
                children: [
                    {
                        name: "Child1",
                        children: [
                            {
                                name: "Grandchild1",
                                children: []
                            },
                            {
                                name: "Grandchild2",
                                children: []
                            },
                            {
                                name: "Grandchild3",
                                children: []
                            }
                        ]
                    },
                    {
                        name: "Child2",
                        children: []
                    }
                ]
            }
        ]
    };

    var data = [
        {name: '电器', depth:0},
        {name: '冰箱', depth:1},
        {name: '双门', depth:2},
        {name: '单门', depth:2},
        {name: '电视', depth:1},
        {name: '等离子', depth:2}
    ]


    function toJson(data){
        var treeFamily = {children: []};
        var maxDepth = 0;
        for (var i in data){
            if (data[i].depth > maxDepth){
                maxDepth = data[i].depth;
            }
        }

        for (var i = 0; i <= maxDepth; i++){

        }
    }
});

app.directive("dtree", function (RecursionHelper) {
    return {
        restrict: "A",
        scope: {family: '='},
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