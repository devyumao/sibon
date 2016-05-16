/**
 * @file 页面一 controller
 * @author yumao [zhangyu38@baidu.com]
 */

angular.module('sibon').controller('View1Controller', [
    '$scope', '$http', 'colors', 'APP_URLS',
    function ($scope, $http, colors, appUrls) {
        'use strict';

        var chartOption = {
            color: [
                colors.byName('info'),
                colors.byName('success'),
                colors.byName('yellow')
            ],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['准确率', '召回/总流量', '漏召回率'],
                x: 'center'
            },
            toolbox: {
                show: true,
                feature: {
                    saveAsImage: {
                        show: true
                    }
                }
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: []
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    max: 1.2,
                    splitNumber: 6
                }
            ],
            series: [
                {
                    name: '准确率',
                    type: 'line',
                    data: []
                },
                {
                    name: '召回/总流量',
                    type: 'line',
                    data: []
                },
                {
                    name: '漏召回率',
                    type: 'line',
                    data: []
                }
            ]
        };

        function fetch(options, callback) {
            $scope.chartLoading = 1;
            $http.get(appUrls.GET_INDICATORS, {
                params: {
                    startTime: options.start,
                    endTime: options.end
                }
            }).success(function (res) {
                $scope.chartLoading = 0;
                callback(res.data);
            });
        }

        function update(data) {
            $scope.accuracy = data.totalAccuracy * 100;
            $scope.recall = data.totalRecall * 100;
            $scope.omission = data.totalOmission * 100;
            chartOption.xAxis[0].data = data.timeline;
            chartOption.series[0].data = data.accuracy;
            chartOption.series[1].data = data.recall;
            chartOption.series[2].data = data.omission;
            $scope.chartOption = chartOption;
        }

        var latest = moment().subtract(1, 'day');
        var aWeekAgo = moment().subtract(7, 'day');
        $scope.date = {
            startDate: aWeekAgo,
            endDate: latest
        };
        $scope.dateOption = {
            maxDate: latest
        };

        $scope.$watch('date', function (newDate) {
            newDate && fetch(
                {
                    start: moment(newDate.startDate).unix(),
                    end: moment(newDate.endDate).unix()
                },
                update
            );
        });

        // setTimeout(function () {
        //     console.log('haha');
        //     $scope.date = {
        //         startDate: latest,
        //         endDate: latest
        //     };
        // }, 2000);
    }
]);
