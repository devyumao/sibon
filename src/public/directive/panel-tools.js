/**
 * @file 面板工具 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon')
    .directive('paneltool', [
        '$compile', '$timeout',
        function ($compile, $timeout) {
            var templates = {
                collapse: [
                    '<a href="#" panel-collapse="" tooltip="Collapse Panel" ng-click="{{panelId}} = !{{panelId}}">',
                        '<em ng-show="{{panelId}}" class="fa fa-plus"></em>',
                        '<em ng-show="!{{panelId}}" class="fa fa-minus"></em>',
                    '</a>'
                ].join(''),
                dismiss: [
                    '<a href="#" panel-dismiss="" tooltip="Close Panel">',
                        '<em class=f"a fa-times"></em>',
                    '</a>'
                ].join(''),
                refresh: [
                    '<a href="#" panel-refresh="" data-spinner="{{spinner}}" tooltip="Refresh Panel">',
                        '<em class="fa fa-refresh"></em>',
                    '</a>'
                ].join('')
            };

            /**
             * 取得填充模板
             *
             * @param {jQuery} elem 元素
             * @param {expression|Object=} attrs 属性
             * @return {string} 填充模板
             */
            function getTemplate(elem, attrs) {
                var temp = '';
                attrs = attrs || {};
                if (attrs.toolCollapse) {
                    temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')));
                }
                if (attrs.toolDismiss) {
                    temp += templates.dismiss;
                }
                if (attrs.toolRefresh) {
                    temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
                }

                return temp;
            }

            return {
                restrict: 'E',
                scope: false,
                link: function ($scope, $element, $attrs) {

                    var tools = $scope.panelTools || $attrs;

                    $timeout(function () {
                        $element.html(getTemplate($element, tools)).show();
                        $compile($element.contents())($scope);

                        $element.addClass('pull-right');
                    });

                }
            };
        }
    ])
    // 面板解除
    .directive('panelDismiss', [
        '$q', 'Utils',
        function ($q, Utils) {
            return {
                restrict: 'A',
                controller: [
                    '$scope', '$element',
                    function ($scope, $element) {
                        var removeEvent = 'panel-remove';
                        var removedEvent = 'panel-removed';

                        $element.on('click', function () {

                            var parent = $(this).closest('.panel');

                            removeElement();

                            /**
                             * 移除元素
                             */
                            function removeElement() {
                                var deferred = $q.defer();
                                var promise = deferred.promise;

                                $scope.$emit(removeEvent, parent.attr('id'), deferred);
                                promise.then(destroyMiddleware);
                            }

                            /**
                             * 销毁中间件
                             */
                            function destroyMiddleware() {
                                if (Utils.support.animation) {
                                    parent.animo({
                                        animation: 'bounceOut'
                                    }, destroyPanel);
                                }
                                else {
                                    destroyPanel();
                                }
                            }

                            /**
                             * 销毁面板
                             */
                            function destroyPanel() {
                                var col = parent.parent();
                                parent.remove();
                                // remove the parent if it is a row and is empty and not a sortable (portlet)
                                // row && empty && not sortable, 则移除 parent
                                col
                                    .filter(function () {
                                        var el = $(this);
                                        return (el.is('[class*="col-"]:not(.sortable)')
                                            && el.children('*').length === 0);
                                    })
                                    .remove();

                                $scope.$emit(removedEvent, parent.attr('id'));
                            }

                        });
                    }
                ]
            };
        }
    ])
    // 面板折叠
    .directive('panelCollapse', [
        '$timeout',
        function ($timeout) {

            var storageKeyName = 'panelState';
            var storage;

            return {
                restrict: 'A',
                scope: false,
                controller: ['$scope', '$element',
                    function ($scope, $element) {

                        var $elem = $($element);
                        var parent = $elem.closest('.panel');
                        var panelId = parent.attr('id');

                        storage = $scope.$storage;

                        // 载入本地
                        var currentState = loadPanelState(panelId);
                        if (typeof currentState !== 'undefined') {
                            $timeout(
                                function () {
                                    $scope[panelId] = currentState;
                                },
                                10
                            );
                        }

                        // 绑定图标切换
                        $element.bind('click', function () {
                            savePanelState(panelId, !$scope[panelId]);
                        });

                    }
                ]
            };

            /**
             * 保存面板状态
             *
             * @param {number} id 序号
             * @param {Object} state 状态
             */
            function savePanelState(id, state) {
                if (!id) {
                    return;
                }
                var data = angular.fromJson(storage[storageKeyName]);
                if (!data) {
                    data = {};
                }
                data[id] = state;
                storage[storageKeyName] = angular.toJson(data);
            }

            /**
             * 读取面板状态
             *
             * @param {number} id 序号
             * @return {?Object} 面板状态
             */
            function loadPanelState(id) {
                if (!id) {
                    return null;
                }
                var data = angular.fromJson(storage[storageKeyName]);
                if (data) {
                    return data[id];
                }
                return null;
            }

        }
    ])
    // 面板刷新
    .directive('panelRefresh', [
        '$q', function ($q) {
            return {
                restrict: 'A',
                scope: false,
                controller: ['$scope', '$element',
                    function ($scope, $element) {

                        var refreshEvent = 'panel-refresh';
                        var whirlClass = 'whirl';
                        var defaultSpinner = 'standard';

                        $element.on('click', function () {
                            var $this = $(this);
                            var panel = $this.parents('.panel').eq(0);
                            var spinner = $this.data('spinner') || defaultSpinner;

                            // 显示 spinner
                            panel.addClass(whirlClass + ' ' + spinner);

                            $scope.$emit(refreshEvent, panel.attr('id'));

                        });

                        // 监听移除 spinner 事件
                        $scope.$on('removeSpinner', function removeSpinner(ev, id) {
                            if (!id) {
                                return;
                            }
                            var newid = id.charAt(0) === '#' ? id : ('#' + id);
                            angular.element(newid)
                                .removeClass(whirlClass);
                        });
                    }
                ]
            };
        }
    ]);
