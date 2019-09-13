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

        // Extend HighChart chart options
        $.extend(true, chartOptions, {
        });

        return chartOptions;
    }
}