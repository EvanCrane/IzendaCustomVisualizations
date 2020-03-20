import $ from 'jquery';
import { getClass, ReportPartUtils } from 'IzendaSynergy';

const HighchartVizEngine = getClass('HighchartVizEngine');
const highcharts = HighchartVizEngine.VisualizationLibrary;
const HighchartOptionsBuilder = getClass('HighchartOptionsBuilder');
const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
const PieChartOptionsBuilder = getClass('PieChartOptionsBuilder');

export default class AttainmentGaugeOptionsBuilder extends HighchartOptionsBuilder {
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
    const izendaSeriesConfig = userOptions.izendaSeriesConfig || {};
    const izendaOptions = userOptions.izendaOptions;
    const serieName = izendaOptions.serieName;
    const valueData = get('[0].data[0].y', userOptions.series);
    userOptions.yAxis = {};


    return null;
  }
}