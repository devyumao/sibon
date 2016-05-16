/**
 * @file 侧边栏 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('sidebar', [
    '$window', 'APP_MEDIAQUERY',
    function ($window, mq) {

        var $win = $($window);
        var $sidebar;
        var $scope;

        /**
         * 切换菜单项
         *
         * @inner
         * @param {jQuery} $listItem 列表项
         * @return {jQuery} 子导航
         */
        function toggleMenuItem($listItem) {
            removeFloatingNav();

            var ul = $listItem.children('ul');

            if (!ul.length) {
                return $();
            }

            if ($listItem.hasClass('open')) {
                toggleTouchItem($listItem);
                return $();
            }

            var $aside = $('.aside');
            var mar = $scope.app.layout.isFixed ? parseInt($aside.css('padding-top'), 0) : 0;

            var $subNav = ul.clone().appendTo($aside);

            toggleTouchItem($listItem);

            var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
            var winHeight = $win.height();

            $subNav
                .addClass('nav-floating')
                .css({
                    position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
                    top: itemTop,
                    bottom: ($subNav.outerHeight(true) + itemTop > winHeight) ? 0 : 'auto'
                });

            $subNav.on('mouseleave', function () {
                toggleTouchItem($listItem);
                $subNav.remove();
            });

            return $subNav;
        }

        /**
         * 切换触摸项
         *
         * @inner
         * @param {jQuery} $element 元素
         */
        function toggleTouchItem($element) {
            $element
                .siblings('li')
                .removeClass('open')
                .end()
                .toggleClass('open');
        }

        /**
         * 移除浮动导航
         *
         * @inner
         */
        function removeFloatingNav() {
            $('.sidebar-subnav.nav-floating').remove();
        }

        /**
         * 判断是否触摸态
         *
         * @inner
         * @return {boolean} 是否触摸态
         */
        function isTouch() {
            return $('html').hasClass('touch');
        }

        var $body = $('body');

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

        return {
            restrict: 'EA',
            template: '<nav class="sidebar" ng-transclude></nav>',
            transclude: true,
            replace: true,
            link: function (scope, $element, $attrs) {

                $scope = scope;
                $sidebar = $element;

                var eventName = isTouch() ? 'click' : 'mouseenter';
                var $subNav = $();
                // 绑定折叠态侧边栏的触发事件
                $sidebar.on(eventName, '.nav > li', function () {
                    if (isSidebarCollapsed() && !isMobile()) {
                        $subNav.trigger('mouseleave');
                        $subNav = toggleMenuItem($(this));
                    }
                });

                // 响应关闭侧边栏菜单事件
                scope.$on('closeSidebarMenu', function () {
                    removeFloatingNav();
                    $('.sidebar li.open').removeClass('open');
                });

            }
        };
    }
]);
