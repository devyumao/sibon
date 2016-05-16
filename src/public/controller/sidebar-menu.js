/**
 * @file 侧边栏菜单 controller
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').controller('SidebarController', [
    '$rootScope', '$scope', '$state', '$location', '$http',
    '$timeout', 'APP_MEDIAQUERY', 'APP_CONFIG',
    function ($rootScope, $scope, $state, $location, $http,
        $timeout, mq, appConfig) {

        var currentState = $rootScope.$state.current.name;
        // 状态变化引起的调整
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            currentState = toState.name;
            $('body.aside-toggled').removeClass('aside-toggled');
            $rootScope.$broadcast('closeSidebarMenu');
        });

        var $win = $(window);
        // 响应窗口调整
        $win.on('resize', function () {
            if (isMobile()) {
                $body.removeClass('aside-collapsed');
            }
            else {
                $body.removeClass('aside-toggled');
            }
        });

        /**
         * 判断菜单项是否激活
         *
         * @inner
         * @param {Object} item 菜单项
         * @return {boolean} 是否激活
         */
        function isActive(item) {
            if (!item) {
                return;
            }

            if (!item.sref || item.sref === '#') {
                var foundActive = false;
                angular.forEach(item.submenu, function (value, key) {
                    if (isActive(value)) {
                        foundActive = true;
                    }
                });
                return foundActive;
            }

            return $state.is(item.sref) || $state.includes(item.sref);
        }

        /**
         * 取得菜单项的类属性
         *
         * @param {Object} item 菜单项
         * @return {string} 类属性
         */
        $scope.getMenuItemPropClasses = function (item) {
            return (item.heading ? 'nav-heading' : '')
                + (isActive(item) ? ' active' : '');
        };

        /**
         * 载入侧边栏菜单
         */
        $scope.loadSidebarMenu = function () {
            var menuJson = appConfig.FE_ROOT + 'server/sidebar-menu.json';
            var menuURL = menuJson + '?v=' + (new Date().getTime());
            $http.get(menuURL)
                .success(function (items) {
                    $rootScope.menuItems = items;
                });
        };

        $scope.loadSidebarMenu();


        /**
         * 折叠列表
         *
         * @type {Array.<boolean>}
         */
        var collapseList = [];

        /**
         * 添加折叠
         *
         * @param {number} index 序号
         * @param {Object} item 菜单项
         */
        $scope.addCollapse = function (index, item) {
            collapseList[index] = !isActive(item);
        };

        /**
         * 判断是否折叠
         *
         * @param {number} index 序号
         * @return {boolean} 是否折叠
         */
        $scope.isCollapse = function (index) {
            return collapseList[index];
        };

        /**
         * 切换折叠
         *
         * @param {number} index 序号
         * @param {boolean} isParentItem 是否是父项
         */
        $scope.toggleCollapse = function (index, isParentItem) {
            if (isSidebarCollapsed() && !isMobile()) {
                return;
            }

            /**
             * 关闭除指定外的所有
             *
             * @inner
             * @param {[type]} index [index description]
             */
            function closeAllBut(index) {
                index += '';
                for (var i in collapseList) {
                    if (index < 0 || index.indexOf(i) < 0) {
                        collapseList[i] = true;
                    }
                }
            }

            if (angular.isDefined(collapseList[index])) {
                collapseList[index] = !collapseList[index];
                closeAllBut(index);
            }
            else if (isParentItem) {
                closeAllBut(-1);
            }
        };


        // var $html = $('html');
        var $body = $('body');

        /**
         * 判断是否移动端
         * 根据需求, 仅用窗口尺寸判断即可
         *
         * @inner
         * @return {boolean} 是否移动端
         */
        function isMobile() {
            return $win.width() < mq.tablet;
        }

        // function isTouch() {
        //     return $html.hasClass('touch');
        // }

        /**
         * 判断侧边栏是否是折叠态
         *
         * @inner
         * @return {boolean} 侧边栏是否是折叠态
         */
        function isSidebarCollapsed() {
            return $body.hasClass('aside-collapsed');
        }

        // function isSidebarToggled() {
        //     return $body.hasClass('aside-toggled');
        // }
    }
]);
