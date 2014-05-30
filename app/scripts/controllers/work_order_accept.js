var app = angular.module('azerpApp');
app.controller('WorkOrderAcceptCtrl', function($scope){
    $scope.userInfo = {};

});

app.directive('userInfoToolbar', function(){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'user_info_toolbar.html',
        link: function(scope, element){
            element.find('button').tooltip({placement:'top'})
        }
    }
});