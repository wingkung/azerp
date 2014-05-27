var app = angular.module('azerpApp');
app.controller('ContentCtrl', function($scope){
    $scope.$on('content_switch', function(event, data){
        $scope.currentContent = data;
    })
})