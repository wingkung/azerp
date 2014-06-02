var app = angular.module('azerpApp');
app.controller('WorkOrderAcceptCtrl', function($scope){
    $scope.userInfo = {item: {value:'北京'}, value:'北京'};
    $scope.sexes = [
        {display: '先生', value: '1'},
        {display: '女士', value: '2'}
    ];
    $scope.test = function(){
        console.log($scope.userInfo.item);
    }

});