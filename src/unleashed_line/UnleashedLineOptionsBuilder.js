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

    // Iterating through each data object in the series
    // This will overwrite Izenda's default behavior of setting null values for the Y axis to plot their points as 0. 
    // The overwrite will check for each yRawData value in the data object for nulls and will change the Y point value to null.
    // This is so the chart will not show the null point
    chartOptions.series.forEach(serie => {
      const data = serie.data;
      if (data) {
        data.forEach(point => {
          const { yRawData } = point;
          if (yRawData === null) {
            const { y } = point;
            Object.assign(point, {
              y: null
            });
          }
        });
      }
    });


    const enableConnectNulls = userOptions.plotOptions && userOptions.plotOptions.series && userOptions.plotOptions.series.newConnectNulls;

    //const insightValue = dataParser.dataStructure['insightValues'][0];
    //console.log('insightValue');

    // Extend the chart options with 3D options
    $.extend(true, chartOptions, {
      plotOptions: {
       series: {
          // Will connect gaps in data <Default: false>
          connectNulls: enableConnectNulls !== undefined ? enableConnectNulls : false,
       }
     },
    });
    return chartOptions;
  }
}