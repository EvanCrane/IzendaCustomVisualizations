/* regression_custom/index.js
* File used to extend and initialize basic configs for the chart builder
*/

import RegressionLineOptionsBuilder from './RegressionLineOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
} from 'IzendaSynergy';

/*
* Extend the chart visualization
*/
extendReportPartStyleConfiguration(REPORT_PART_TYPES.Chart, 'RegressionLine', CHART_STYLES.Line, {
    /**
   * Visual type to identify which Highchart type uto be rendered
   */
    visualType: 'line',

    /**
     * The label text shows in chart type dropdown
     */
    visualLabel: 'Regression Line',

    /**
     * Define which options builder class is using for this chart type
     */
    optionsBuilder: RegressionLineOptionsBuilder,

    /*
    *   Map the 3d options value into userOptions which is passed into option builder
    */
    
}); 