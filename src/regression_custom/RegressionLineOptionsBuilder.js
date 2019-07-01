/* regression_custom/RegressionLineOptionsBuilder.js
* File used to add options to the chart builder
* Will remove labels from the regression line
*/

import $ from 'jquery';
import { getClass } from 'IzendaSynergy';


const LineChartOptionsBuilder = getClass('LineChartOptionsBuilder');

/**
 * The chart options builder to extend the current chart setting with Highcharts line options
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
    // Define a custom series class name that will appear in the HTML
    let seriesClassName = 'regression-lines';
    // Verify that there is a series and that the regression setting is enabled
    if (chartOptions.series[0].regression && userOptions.plotOptions.series.dataLabels.enabled) {
      seriesClassName = 'regression-lines-enabled';
    }

    // Extend the chart options with Highcharts line options
    $.extend(true, chartOptions, {
      chart: {
        events: {
          // Define a Highcharts event handler that will fire on chart loading
          // This event handler will change the regression line labels to display:none to hide them
          load: function () {
            if (seriesClassName === 'regression-lines-enabled') {
              $('g.regression-lines-enabled').last().css('display', 'none');
            }
          }
        }
      },
      plotOptions: {
        series: {
          // Use the defined custom className that Highcharts will include in its generated HTML
          className: seriesClassName
        }
      },
    });
    return chartOptions;
  }
}
