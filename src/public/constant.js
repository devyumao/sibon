/**
 * @file 常量
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').constant('APP_COLORS', {
    // 颜色
    'primary'     : '#5d9cec',
    'success'     : '#27c24c',
    'info'        : '#23b7e5',
    'warning'     : '#ff902b',
    'danger'      : '#f05050',
    'inverse'     : '#131e26',
    'green'       : '#37bc9b',
    'pink'        : '#f532e5',
    'purple'      : '#7266ba',
    'dark'        : '#3a3f51',
    'yellow'      : '#fad732',
    'gray-darker' : '#232735',
    'gray-dark'   : '#3a3f51',
    'gray'        : '#dde6e9',
    'gray-light'  : '#e4eaec',
    'gray-lighter': '#edf1f2',
    'white-dark'  : '#ccc',
    'black-light' : '#333'

}).constant('APP_MEDIAQUERY', {
    // 媒体查询
    desktopLG: 1200,
    desktop: 992,
    tablet: 768,
    mobile: 480

}).constant('APP_REQUIRES', {
    // 独立第三方脚本
    scripts: {
        modernizr: [
            'vendor/modernizr/modernizr.js'
        ],
        icons: [
            'vendor/fontawesome/css/font-awesome.min.css',
            'vendor/simple-line-icons/css/simple-line-icons.css'
        ],
        classyloader: [
            'vendor/jquery-classyloader/js/jquery.classyloader.min.js'
        ],
        echarts: [
            'vendor/echarts/echarts.js'
        ],
        moment: [
            'vendor/moment/moment.min.js'
        ],
        daterange: [
            'vendor/daterangepicker/daterangepicker-bs3.css',
            'vendor/daterangepicker/daterangepicker.js'
        ],
        filestyle: [
            'vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'
        ],
        parsley: [
            'vendor/parsleyjs/dist/parsley.min.js'
        ],
        inputmask: [
            'vendor/jquery.inputmask/dist/jquery.inputmask.bundle.min.js'
        ],
        whirl: [
            'vendor/whirl/dist/whirl.css'
        ],
        animate: [
            'vendor/animate.css/animate.min.css'
        ],
        animo: [
            'vendor/animo.js/animo.js'
        ],
        slimscroll: [
            'vendor/slimScroll/jquery.slimscroll.min.js'
        ],
        taginput: [
            'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
            'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'
        ],
        jqueryUI: [
            'vendor/jquery-ui/ui/core.js',
            'vendor/jquery-ui/ui/widget.js'
        ],
        fullcalendar: [
            'vendor/fullcalendar/dist/fullcalendar.min.js',
            'vendor/fullcalendar/dist/fullcalendar.css'
        ],
        spinkit: [
            'vendor/spinkit/css/spinkit.css'
        ]
    },

    // 基于 Angular 的脚本
    modules: [
        {
            name: 'toaster',
            files: [
                'vendor/angularjs-toaster/toaster.js',
                'vendor/angularjs-toaster/toaster.css'
            ]
        },
        {
            name: 'daterangepicker',
            files: [
                'vendor/angular-daterangepicker/angular-daterangepicker.js'
            ]
        },
        {
            name: 'ngTable',
            files: [
                'vendor/ng-table/ng-table.min.js',
                'vendor/ng-table/ng-table.min.css'
            ]
        },
        {
            name: 'ngTableExport',
            files: ['vendor/ng-table-export/ng-table-export.js']
        },
        {
            name: 'ngDialog',
            files: [
                'vendor/ngDialog/js/ngDialog.min.js',
                'vendor/ngDialog/css/ngDialog.min.css',
                'vendor/ngDialog/css/ngDialog-theme-default.min.css'
            ]
        },
        {
            name: 'angularFileUpload',
            files: [
                'vendor/angular-file-upload/angular-file-upload.js'
            ]
        },
        {
            name: 'uiSelect',
            files: [
                'vendor/angular-ui-select/dist/select.js',
                'vendor/angular-ui-select/dist/select.css'
            ]
        },
        {
            name: 'angularCarousel',
            files: [
                'vendor/angular-carousel/dist/angular-carousel.css',
                'vendor/angular-carousel/dist/angular-carousel.js'
            ]
        }
    ]

}).constant('APP_CONFIG', {

    FE_ROOT: './'

}).constant('APP_URLS', {

    // 示例
    GET_INDICATORS: 'http://pvid.int.nuomi.com/pvid/keydata',
    GET_TRAFFIC: 'http://pvid.int.nuomi.com/pvid/monitor',
    GET_REALTIME: 'http://pvid.int.nuomi.com/pvid/realtimequery',
    GE_BLACK_LIST: 'http://pvid.int.nuomi.com/pvid/manualblacklist'

});
