/**
 * @file 即时 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('now', [
    'dateFilter', '$interval',
    function (dateFilter, $interval) {
        return {
            restrict: 'E',
            link: function ($scope, $element, $attrs) {

                var format = $attrs.format;

                /**
                 * 更新时间
                 *
                 * @inner
                 */
                function updateTime() {
                    var dt = dateFilter(new Date(), format);
                    $element.text(dt);
                }

                updateTime();
                $interval(updateTime, 1000);

            }
        };
    }
]);
