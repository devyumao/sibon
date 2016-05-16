/**
 * @file 滚动条 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('scrollable', function () {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            var defaultHeight = 250;
            elem.slimScroll({
                height: (attrs.height || defaultHeight)
            });
        }
    };
});
