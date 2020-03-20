import $ from 'jquery';
import { getClass, ReportPartUtils } from 'IzendaSynergy';


const HighchartVizEngine = getClass('HighchartVizEngine');
const highcharts = HighchartVizEngine.VisualizationLibrary;

//const HighchartOptionsBuilder = getClass('HighchartOptionsBuilder');
const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');

export default class ActivityGaugeOptionsBuilder extends SolidGaugeOptionsBuilder {
    constructor(...args) {
        super(...args);
    }

    /**
    * The blank slate for creating the chart options and how the chart will integrate with Izenda's data
    */

    /**
   * Build Highchart variable options for each chart type
   * @param {string} visualType Highchart chart type
   * @param {Object} highchartOptions Highchart options
   * @param {Object} chartData Chart data
   */

    /**
    * Build the specific chart options by visualization type
    * @param {string} visualType The visualization type ('column')
    * @param {*} userOptions The options set in chart properties panel
    * @param {*} dataParser The data parser contains the query data and the data structures (fields, field mapping...)
    */
    buildOptionsByType(visualType, userOptions, dataParser) {
        let chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);
        const nameFieldMapping = dataParser.dataStructure['valuesLabels'][0];
        const zFieldMapping = dataParser.dataStructure['ZValues'][0];

        const zAxisType = ReportPartUtils.getAxisType(zFieldMapping).type;
        const zAxisConfig = izendaSeriesConfig[zFieldMapping.fieldNameAlias];
        
        return chartOptions;
    }
}
