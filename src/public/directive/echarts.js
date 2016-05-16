/**
 * @file ECharts directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('echarts', function () {
    'use strict';

    return {
        restrict: 'A',
        link: function ($scope, $element, $attrs) {
            var theme = $attrs.theme;

            // 初始化图表
            var chart = echarts.init($element[0], theme ? theme : 'blue');

            // 检测参数项变化
            $attrs.$observe('option', function (newValue) {
                if (!newValue) {
                    return;
                }
                var option = JSON.parse(newValue);
                chart.setOption(option, true);
                option.restore && chart.restore();
            });

            // 检测载入状态
            $attrs.$observe('loading', function (newValue) {
                switch (newValue) {
                    case '0':
                        chart.hideLoading();
                        break;
                    case '1':
                        chart.showLoading({
                            effect: 'whirling'
                        });
                        break;
                }
            });
        }
    };
});
