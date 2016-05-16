/**
 * @file 配置
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').config([
    '$ocLazyLoadProvider', 'APP_REQUIRES', 'APP_CONFIG',

    function ($ocLazyLoadProvider, appRequires, appConfig) {
        // 调整 requires 路径
        var generatePath = function (file) {
            return appConfig.FE_ROOT + file;
        };
        var scripts = appRequires.scripts;
        for (var name in scripts) {
            if (scripts.hasOwnProperty(name)) {
                scripts[name] = scripts[name].map(generatePath);
            }
        }
        appRequires.modules = appRequires.modules.map(function (module) {
            module.files = module.files.map(generatePath);
            return module;
        });

        // 懒加载
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: appRequires.modules
        });
    }

]).config([
    '$stateProvider', '$urlRouterProvider', 'RouteHelpersProvider',

    function ($stateProvider, $urlRouterProvider, helper) {
        // 默认路由
        $urlRouterProvider.otherwise('/app/view-1');

        // 应用路由
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: helper.basepath('app.html'),
                controller: 'AppController',
                resolve: helper.resolveFor('modernizr', 'icons')
            })
            .state('app.view1', {
                url: '/view-1',
                title: '页面一',
                templateUrl: helper.basepath('view-1/view-1.html'),
                controller: 'View1Controller',
                resolve: helper.resolveFor('classyloader', 'echarts', 'moment', 'daterange', 'daterangepicker')
            })
            .state('app.view2', {
                url: '/view-2',
                title: '页面一',
                templateUrl: helper.basepath('view-2/view-2.html'),
                controller: 'View2Controller'
            });
    }

]).config([
    'cfpLoadingBarProvider',

    function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 500;
        cfpLoadingBarProvider.parentSelector = '.wrapper > section';
    }

]);
