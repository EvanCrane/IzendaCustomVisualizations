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

    chartOptions.series.forEach(serie => {
      const data = serie.data;
      if (data) {
        data.forEach(point => {
          const { yRawData } = point;
          if (yRawData === null) {
           const { y } = point;
            Object.assign(point,{
              y: null
            });
          } 
        });
      }
    });

    //const insightValue = dataParser.dataStructure['insightValues'][0];
    //console.log('insightValue');

    // Extend the chart options with 3D options
    $.extend(true, chartOptions, {
      plotOptions: {
        series: {
          connectNulls: false
        }
      },
      tooltip: {
        //will disable tooltip <Default: true>
        //enabled: true,

        // Animation <Default: true>
        // animation: true,

        // Oridinal Settings
        //xAxis: {
        //  ordinal: true
        //},

        


        //Determines if separate lines use the same tooltip. 
        shared: false,
        useHtml: true,
        //formatter: function () {
        // return 'Test value - x: <b>' + this.x + '</b> y: <b>' + this.y + '</b>';
        //}
      }
    });

    

    return chartOptions;
  }
}