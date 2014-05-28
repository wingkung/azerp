'use strict';

var app = angular.module('azerpApp', ['chartjs-directive', 'RecursionHelper']);
app.directive("tree", function($timeout){
    return {
        restrict: 'C',
        scope: {
            family: "="
        },
        link: function(scope, element){
            scope.$watch('family', function(){
                $timeout(function() {
                    element.find('li:has(ul)').addClass('parent_li').find(' > div > span').attr('title', '展开');
                    element.find('li.parent_li > div > span').on('click', function (e) {
                        var children = $(this).closest('li.parent_li').find(' > ul > li');
                        if (children.is(":visible")) {
                            children.hide('fast');
                            $(this).attr('title', '收起').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                        } else {
                            children.show('fast');
                            $(this).attr('title', '展开').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                        }
                        e.stopPropagation();
                    });
                },0);
            })
        }
    }
});

