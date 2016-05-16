/**
 * @file 表格全选 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('checkAll', function () {
    return {
        restrict: 'A',
        controller: [
            '$scope', '$element', function ($scope, $element) {
                $element.on('change', function () {
                    var $this = $(this);
                    var index = $this.index() + 1;
                    var checkbox = $this.find('input[type="checkbox"]');
                    var table = $this.parents('table');

                    table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
                        .prop('checked', checkbox[0].checked);
                });
            }
        ]
    };

});
