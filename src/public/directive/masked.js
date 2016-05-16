/**
 * @file 输入框遮罩 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('masked', function () {
    return {
        restrict: 'A',
        controller: [
            '$scope', '$element',
            function ($scope, $element) {
                var $elem = $($element);
                if ($.fn.inputmask) {
                    $elem.inputmask();
                }
            }
        ]
    };
});
