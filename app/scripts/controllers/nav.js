var app = angular.module('azerpApp');
app.controller('NavCtrl', function ($scope, $rootScope, $timeout) {
    $scope.groups = [
        {title: '工单管理', items: [
            {title: '工单受理', href: 'work_order_accept'},
            {title: '工单派发', href: 'work_order_dispatch'},
            {title: '工单处理', href: 'work_order_handle'},
            {title: '工单查询', href: 'work_order'}
        ]},
        {title: '产品管理', items: [
            {title: '产品查询', href: 'product'},
            {title: '产品管理', href: 'product_manage'},
            {title: '主管审批', href: 'director_approval'},
            {title: '部门审批', href: 'department_approval'},
            {title: '库房管理', href: 'storehouse'}
        ]},
        {title: '订单管理', items: [
            {title: '订单查询', href: 'order'},
            {title: '订单受理', href: 'order_accept'}
        ]},
        {title: '客户管理', items: [
            {title: '信息查询', href: 'user'}
        ]},
        {title: '知识库', items: [
            {title: '知识库查询', href: 'wiki'},
            {title: '知识库维护', href: 'wiki_maintenance'}
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
            {title: '来电历史', href: 'call_his'},
            {title: '黑名单', href: 'blacklist'},
            {title: '白名单', href: 'vip'},
            {title: '留言查询', href: 'voice_message'}
        ]},
        {title: '个人管理', items: [
            {title: '信息修改', href: 'personal_data'},
            {title: '密码修改', href: 'password'}
        ]}
    ];

    $scope.contentSwitch = function(data){
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
                element.closest('.panel-group').find('a').removeClass('active');
                element.addClass('active');
            })
        }
    }
});

