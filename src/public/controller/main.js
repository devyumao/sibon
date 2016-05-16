/**
 * @file 应用 controller
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').controller('AppController', [
    '$rootScope', '$scope', '$state', '$window', '$localStorage',
    '$timeout', 'colors', 'browser', 'cfpLoadingBar',
    function ($rootScope, $scope, $state, $window, $localStorage,
        $timeout, colors, browser, cfpLoadingBar) {

        // 页面间转场
        var thBar;
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            if ($('.wrapper > section').length) {
                thBar = $timeout(
                    function () {
                        cfpLoadingBar.start();
                    },
                    0 // 设置延时阈值
                );
            }
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            event.targetScope.$watch('$viewContentLoaded', function () {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });


        // 状态无法找到
        $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
            console.log(unfoundState.to); // 'lazy.state'
            console.log(unfoundState.toParams); // {a: 1, b: 2}
            console.log(unfoundState.options); // {inherit: false} + 默认选项
        });
        // 状态切换错误
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            console.log(error);
        });
        // 状态切换成功
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            // 新页面滚动至顶
            $window.scrollTo(0, 0);
            // 存下当前标题
            $rootScope.currTitle = $state.current.title;
        });

        $rootScope.currTitle = $state.current.title;

        /**
         * 取得网页 title 内容
         *
         * @return {string} 网页 title 内容
         */
        $rootScope.pageTitle = function () {
            return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        };

        // 监听布局收起
        $rootScope.$watch('app.layout.isCollapsed', function (newValue, oldValue) {
            if (newValue === false) {
                $rootScope.$broadcast('closeSidebarMenu');
            }
        });

        // 还原布局设置
        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;
        }
        else {
            $localStorage.layout = $scope.app.layout;
        }

        // 监听布局变化存入本地
        $rootScope.$watch(
            'app.layout',
            function () {
                $localStorage.layout = $scope.app.layout;
            },
            true
        );


        // 允许页面内引用颜色
        // 用法: {{colorByName('primary')}}
        $scope.colorByName = colors.byName;

        // 动画应用于 main view, 供后续页面载入
        $timeout(function () {
            $rootScope.mainViewAnimation = $rootScope.app.viewAnimation;
        });

        /**
         * 阻止点击事件
         *
         * @param {expression} $event 事件
         */
        $rootScope.cancel = function ($event) {
            $event.stopPropagation();
        };
    }
]);
