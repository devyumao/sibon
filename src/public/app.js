/**
 * @file 应用初始
 * @author yumao [zhangyu38@baidu.com]
 */

var App = angular.module('sibon', [
    'ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate',
    'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize',
    'ngResource'
]).run([
    '$rootScope', '$state', '$stateParams', '$window', '$templateCache', 'APP_CONFIG',
    function ($rootScope, $state, $stateParams, $window, $templateCache, appConfig) {

        // 设置根域引用, 供全局访问
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.$storage = $window.localStorage;

        // 注释掉可禁用模板缓存
        // $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        //     if (typeof toState !== 'undefined') {
        //         $templateCache.remove(toState.templateUrl);
        //     }
        // });

        // 全域量
        $rootScope.app = {
            name: '网站名称',
            description: '网站描述',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: true
            },
            viewAnimation: 'ng-fadeInUp'
        };
        $rootScope.config = {
            feRoot: appConfig.FE_ROOT
        };
        $rootScope.user = {
            name: '访客'
        };

    }
]);
