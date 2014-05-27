var app = angular.module('azerpApp');
app.controller('NavCtrl', function ($scope, $rootScope) {
    $scope.groups = [
        {title: '工单管理', items: [
            {title: '工单受理', href: 'work_order_accept'},
            {title: '工单派发', href: 'work_order_dispatch'},
            {title: '工单处理', href: 'work_order_handle'},
            {title: '工单查询', href: 'work_order_search'},
        ]},
        {title: '产品管理', items: [
            {title: '产品查询', href: 'product_search'},
            {title: '产品管理', href: 'product'},
            {title: '主管审批', href: 'director_approval'},
            {title: '部门审批', href: 'department_approval'},
            {title: '库房管理', href: 'storehouse'},
        ]},
        {title: '订单管理', items: [
            {title: '订单查询', href: 'order_search'},
            {title: '订单受理', href: 'order_accept'}
        ]},
        {title: '客户管理', items: [
            {title: '信息查询', href: 'user_search'}
        ]},
        {title: '知识库', items: [
            {title: '知识库查询', href: 'wiki_search'},
            {title: '知识库维护', href: 'wiki'}
        ]},
        {title: '员工管理', items: [
            {title: '组织结构', href: 'department'},
            {title: '员工管理', href: 'staff'},
            {title: '角色管理', href: 'role'}
        ]},
        {title: '报表统计', items: [
            {title: '报表', href: 'report'}
        ]},
        {title: '话务管理', items: [
            {title: '录音查询', href: 'record'},
            {title: '来电历史', href: 'call_history'},
            {title: '黑名单', href: 'blacklist'},
            {title: '白名单', href: 'vip'},
            {title: '留言查询', href: 'voice_message'},
        ]},
        {title: '个人管理', items: [
            {title: '信息修改', href: 'personal_data'},
            {title: '密码修改', href: 'password'}
        ]}
    ];
    $scope.switch = function(data){
        $rootScope.$broadcast('content_switch', data);
    }
});

app.directive('navGroup', function () {
    return {
        link: function (scope, element){
            element.bind('click', function(){
                element.closest('.panel-group').find('.list-group').addClass('hide');
                element.closest('.panel').find('.list-group').removeClass('hide');
            });
            element.bind('mouseenter', function(){
                element.css('cursor', 'pointer');
            });
            element.bind('mouseleve', function(){
                element.css('cursor', 'auto');
            })
        }
    }
});

app.directive('navGroupItem', function () {
    return {
        link: function(scope, element){
            element.bind('click', function () {
                element.parent().find('a').remove('active');
                element.addClass('active');
            })
        }
    }
});

