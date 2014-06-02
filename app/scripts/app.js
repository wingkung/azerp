'use strict';

var app = angular.module('azerpApp', ['chartjs-directive', 'RecursionHelper']);
app.directive("tree", function ($timeout) {
    return {
        restrict: 'C',
        scope: {
            family: "="
        },
        link: function (scope, element) {
            scope.$watch('family', function () {
                $timeout(function () {
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
                }, 0);
            })
        }
    }
});

app.directive('typeahead', function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            remote: '@',
            item: "="
        },
        link: function (scope, element) {
            var items = new Bloodhound({
                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                remote: scope.remote
            });
            items.initialize();
            element.typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                },
                {
                    name: 'items',
                    displayKey: 'value',
                    source: items.ttAdapter()
                }).on("typeahead:selected", function(e, item){
                    console.log(item);
                    scope.$apply(function(){
                        scope.item = item;
                    })
                }).on("typeahead:closed", function(){
                    $(this).val(scope.item.value);
                })
        }
    }
});

app.directive('button', function(){
    return {
        restrict: 'E',
        link: function(scope, element){
            element.tooltip({placement:'top'})
        }
    }
})

