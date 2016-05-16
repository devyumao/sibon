/**
 * @file 颜色 factory
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').factory('colors', [
    'APP_COLORS',
    function (colors) {

        /**
         * 依据名称
         *
         * @param {string} name 颜色名称
         * @return {string} 十六进制颜色
         */
        function byName(name) {
            return colors[name] || '#fff';
        }

        return {
            byName: byName
        };

    }
]);
