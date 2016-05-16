/**
 * @file 标签输入框 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('tagsinput', [
    '$timeout',
    function ($timeout) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {

                element.on('itemAdded itemRemoved', function () {
                    if (ngModel.$viewValue && ngModel.$viewValue.split) {
                        // 更新 view 至标签组
                        ngModel.$setViewValue(ngModel.$viewValue.split(','));
                        ngModel.$render();
                    }
                });

                $timeout(function () {
                    element.tagsinput();
                });

            }
        };
    }
]);
