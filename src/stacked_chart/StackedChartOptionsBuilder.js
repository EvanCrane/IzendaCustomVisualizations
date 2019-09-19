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

        let isSingleYAxis = userOptions.izSingleYAxis;
        // Only want our own actions to take over if the izSingleYAxis isn't defined. Otherwise let Izenda take over
        isSingleYAxis = (isSingleYAxis || isSingleYAxis === undefined) ? true : false;
        const isMultiSeries = chartOptions.series.length > 1;
        const isThreshold = chartOptions.thresholdSeries.length > 0;
        // Define custom props for the threshold axis
        const thresholdAxisProps = {
            id: 'thresholdY',
            stacklabels: {
                enabled: false,
            },
            opposite: true
        };
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
                // TODO Adjust format for tooltip based on date data
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
                endOnTick: false,
                opposite: false
            }]
        });

        if (isSingleYAxis) {
            if (isMultiSeries) {
                // verify if singleYAxis aka 'All' axis needs to be shown
                // TODO Adjust 'All' text based on language preference
                chartOptions.yAxis[0].title = {
                    text: 'All'
                };
                // Remove all other axis as we only want the All or the threshold axis
                chartOptions.yAxis = chartOptions.yAxis[0];
            }
            if (isThreshold) {
                // define threshold axis if there are threshold series to be displayed
                chartOptions.yAxis = [chartOptions.yAxis, thresholdAxisProps];
            }
        }

        return chartOptions;
    }
}