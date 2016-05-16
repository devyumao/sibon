/**
 * @file 表单验证 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('validateForm', function () {
    return {
        restrict: 'A',
        controller: [
            '$scope', '$element',
            function ($scope, $element) {
                var $elem = $($element);
                if ($.fn.parsley) {
                    $elem.parsley();
                }
            }
        ]
    };
});
