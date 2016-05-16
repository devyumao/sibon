/**
 * @file 向导表单 directive
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').directive('formWizard', [
    '$parse',
    function ($parse) {

        /**
         * 向导类
         *
         * @class
         * @param {number|string} quantity 数量
         * @param {boolean} validate 是否验证
         * @param {HTMLElement} element 元素
         */
        function Wizard(quantity, validate, element) {
            this.quantity = +quantity;
            this.validate = validate;
            this.element = element;
        }

        /**
         * 初始化
         *
         * @public
         * @return {Wizard} 实例
         */
        Wizard.prototype.init = function () {
            this.createSteps(this.quantity);
            this.go(1);
            return this;
        };

        /**
         * 跳转
         *
         * @public
         * @param {number} step 步骤
         */
        Wizard.prototype.go = function (step) {
            if (angular.isDefined(this.steps[step])) {

                if (this.validate && step !== 1) {
                    var form = $(this.element);
                    var group = form.children().children('div').get(step - 2);

                    if (form.parsley().validate(group.id) === false) {
                        return;
                    }
                }

                this.cleanAll();
                this.steps[step] = true;
            }
        };

        /**
         * 判断步骤是否活态
         *
         * @public
         * @param {number} step 步骤
         * @return {boolean} 是否活态
         */
        Wizard.prototype.active = function (step) {
            return !!this.steps[step];
        };

        /**
         * 清除所有步骤
         *
         * @public
         */
        Wizard.prototype.cleanAll = function () {
            var steps = this.steps;
            for (var i in steps) {
                if (steps.hasOwnProperty(i)) {
                    steps[i] = false;
                }
            }
        };

        /**
         * 创建步骤
         *
         * @private
         * @param {number} q 数量
         */
        Wizard.prototype.createSteps = function (q) {
            this.steps = [];
            for (var i = 1; i <= q; i++) {
                this.steps[i] = false;
            }
        };

        return {
            restrict: 'A',
            scope: true,
            link: function (scope, element, attribute) {
                var validate = $parse(attribute.validateSteps)(scope);
                var wiz = new Wizard(attribute.steps, !!validate, element);
                scope.wizard = wiz.init();
            }
        };
    }
]);
