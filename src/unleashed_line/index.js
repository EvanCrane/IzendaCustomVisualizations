/* unleashed_line/index.js
* File used to extend and initialize basic configs for the chart builder
*/

import UnleashedLineOptionsBuilder from './UnleashedLineOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

/*
* Extend the chart visualization
*/
extendReportPartStyleConfiguration(REPORT_PART_TYPES.Chart, 'UnleashedLine', CHART_STYLES.Line, {
    /**
   * Visual type to identify which Highchart type uto be rendered
   */
    visualType: 'line',

    /**
     * The label text shows in chart type dropdown
     */
    visualLabel: 'Unleashed Line',

    /**
     * Define which options builder class is using for this chart type
     */
    optionsBuilder: UnleashedLineOptionsBuilder,
}); 