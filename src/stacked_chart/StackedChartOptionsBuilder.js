import $ from 'jquery';
import { getClass } from 'IzendaSynergy';

const CombinationChartOptionsBuilder = getClass('CombinationChartOptionsBuilder');

export default class StackedChartOptionsBuilder extends CombinationChartOptionsBuilder {
    constructor(...args) {
        super(...args);
    }
    buildOptionsByType(visualType, userOptions, dataParser) {
        // Get chart options from CombinationChartOptionsBuilder
        let chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);
        // Iterate through each series
        chartOptions.series.forEach(serie => {
            if (serie.type === 'column') {
                serie.stack = 0;
            }
            if (serie.isThreshold) {
                serie.yAxis = 'thresholdY';

            } else {
                serie.yAxis = 'stackedY';
            }
        });
        // Extend HighChart chart options
        $.extend(true, chartOptions, {
            tooltip: {
                shared: true,
                crosshairs: true
            },
            plotOptions: {
                column: {
                    stacking: 'percent'
                }
            },
            yAxis: [{
                id: 'stackedY',
                labels: {
                    formatter: function () {
                        return this.value + '%';
                    },
                },
                min: 0,
                max: 100,
                startOnTick: false,
                endOnTick: false
            }, {
                id: 'thresholdY',
                stacklabels: {
                    enabled: false,
                },
                opposite: true
            }]
        });
        return chartOptions;
    }
}