/* regression_custom/RegressionLineOptionsBuilder.js
* File used to add options to the chart builder
*/

import $ from 'jquery';
import { getClass } from 'IzendaSynergy';

const LineChartOptionsBuilder = getClass('LineChartOptionsBuilder');

/**
 * The chart options builder to extend the current chart setting with Highchart 3D options
 */
export default class RegressionLineOptionsBuilder extends LineChartOptionsBuilder {
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
    //const insightValue = dataParser.dataStructure['insightValues'][0];
    //console.log('insightValue');

    // Extend the chart options with 3D options
    $.extend(true, chartOptions, {
      plotOptions: {

        events: {
          load: getTrendInfo()
        },
        linearregression: {
          label: {
            // enabled: false
          }
        }
      },
    });

    return chartOptions;
  }


}

function getTrendInfo() {
  let trendlines = this.series.filter(c => c.options.isRegressionLine);
  for (i in trendlines) {
    trendlines[i].update({
      enableMouseTracking: false
    });
  }
}