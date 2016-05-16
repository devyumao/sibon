/**
 * @file 百分比加载器 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('classyloader', function () {
    'use strict';

    var $scroller = $(window);
    // 用以检测图表是否被触发的类属性名
    var inViewFlagClass = 'js-is-in-view';

    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            // 监测数值变化
            $attrs.$observe('percentage', function (newValue, oldValue) {
                if (!newValue) {
                    return;
                }
                var options = $element.data();
                if (options.triggerInView) {
                    $scroller.scroll(function () {
                        checkLoaderInView($element, options);
                    });
                    checkLoaderInView($element, options);
                }
                else {
                    startLoader($element, options);
                }
            });

            /**
             * 检查加载器是否在视图内
             *
             * @inner
             * @param {expression} $element 元素
             * @param {options} options 参数项
             */
            function checkLoaderInView($element, options) {
                var offset = -20;
                if (!$element.hasClass(inViewFlagClass)
                    && $.Utils.isInView($element, {topoffset: offset})) {
                    startLoader($element, options);
                }
            }

            /**
             * 开始加载器
             *
             * @inner
             * @param {expression} $element 元素
             * @param {options} options 参数项
             */
            function startLoader($element, options) {
                $element.ClassyLoader(options).addClass(inViewFlagClass);
            }
        }
    };
});
