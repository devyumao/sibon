/**
 * @file 通知 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('notify', [
    'Notify',
    function (Notify) {
        return {
            restrict: 'A',
            scope: {
                options: '=',
                message: '='
            },
            link: function ($scope, $element, $attrs) {

                $element.on('click', function (e) {
                    e.preventDefault();
                    Notify.alert($scope.message, $scope.options);
                });

            }
        };
    }
]);
