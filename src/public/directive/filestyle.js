/**
 * @file 文件上传 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('filestyle', function () {
    return {
        restrict: 'A',
        controller: [
            '$scope', '$element',
            function ($scope, $element) {
                var options = $element.data();
                options.classInput = $element.data('classinput') || options.classInput;
                $element.filestyle(options);
            }
        ]
    };
});
