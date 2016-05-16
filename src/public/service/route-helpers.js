/**
 * @file 路由助手 provider
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').provider('RouteHelpers', [
    'APP_CONFIG', 'APP_REQUIRES',
    function (appConfig, appRequires) {

        /**
         * 取得路径
         *
         * @param {[type]} uri 地址
         * @return {string} 路径
         */
        this.basepath = function (uri) {
            return appConfig.FE_ROOT + 'asset/view/' + uri;
        };

        /**
         * resolve 依赖脚本
         *
         * @return {Object}
         */
        this.resolveFor = function () {
            var args = arguments; // 脚本

            return {
                deps: ['$ocLazyLoad', '$q', function ($ocLL, $q) {
                    var promise = $q.when(1); // 空 promise
                    // 为每个参数项建立 promise 链
                    for (var i = 0, len = args.length; i < len; i++) {
                        promise = andThen(args[i]);
                    }

                    /**
                     * 创建 promise 链
                     *
                     * @inner
                     * @param {Array|Function} args 参数
                     * @return {Promise}
                     */
                    function andThen(args) {
                        if (typeof args === 'function') {
                            return promise.then(args);
                        }

                        return promise.then(function () {
                            var whatToLoad = getRequired(args);
                            if (!whatToLoad) {
                                return $.error('Route resolve: Bad resource name [' + args + ']');
                            }
                            return $ocLL.load(whatToLoad);
                        });
                    }

                    /**
                     * 取得依赖资源
                     *
                     * @inner
                     * @param {string} name 脚本名
                     * @return {Array} 依赖资源
                     */
                    function getRequired(name) {
                        if (appRequires.modules) {
                            for (var m in appRequires.modules) {
                                if (appRequires.modules[m].name && appRequires.modules[m].name === name) {
                                    return appRequires.modules[m];
                                }
                            }
                        }

                        return appRequires.scripts && appRequires.scripts[name];
                    }

                    return promise;
                }]
            };
        };

        /**
         * config block for routes
         */
        this.$get = function () {};

    }
]);
