/* unleashed_line/UnleashedLineOptionsBuilder.js
* File used to add options to the chart builder
*/

import $ from 'jquery';
import { getClass } from 'IzendaSynergy';

const LineChartOptionsBuilder = getClass('LineChartOptionsBuilder');

/**
 * The chart options builder to extend the current chart setting with Highchart 3D options
 */
export default class UnleashedLineOptionsBuilder extends LineChartOptionsBuilder {
  // default constructor
  constructor(...args) {
    super(...args);
  }

  /**
 * Build the specific chart options by visualization type
 * @param {string} visualType The visualization type ('line')
 * @param {*} userOptions The options set in chart properties panel
 * @param {*} dataParser The data parser contains the query data and the data structures (fields, field mapping...)
 */
  buildOptionsByType(visualType, userOptions, dataParser) {

    // Get chart options from the default LineChartOptionsBuilder
    let chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);

    // Extend the chart options with 3D options
    $.extend(true, chartOptions, {
      plotOptions: {
        series: {
          step: 'left' // or 'center' or 'right'
        }
      },
      tooltip: {
        enabled: false
      }
    });

    return chartOptions;
  }
}