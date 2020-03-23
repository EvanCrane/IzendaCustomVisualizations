import $ from 'jquery';
import { getClass, ReportPartUtils } from 'IzendaSynergy';

const HighchartVizEngine = getClass('HighchartVizEngine');
const highcharts = HighchartVizEngine.VisualizationLibrary;

// const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
const HighchartOptionsBuilder = getClass('HighchartOptionsBuilder');
export default class AttainmentGaugeOptionsBuilder extends HighchartOptionsBuilder {
    constructor(...args) {
        super(...args);
    }
    buildOptionsByType(visualType, userOptions, dataParser) {
        let chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);
        return chartOptions;
    }
}