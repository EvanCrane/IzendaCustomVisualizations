/* unleashed_line/index.js
* File used to extend and initialize basic configs for the chart builder
*/

import UnleashedLineOptionsBuilder from './UnleashedLineOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createCheckBoxPropertySchema,
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

    /*
    *   Extend the Report Designer of chart properties panel with enable tooltip checkbox under chart setting group.
    */

    propertySchema: {
        groups: {
            chart: {
                fields: {
                    'tooltip': {
                        factory: createCheckBoxPropertySchema,
                        title: 'Enable Tooltip',
                        value: 'getValueByKey',
                        props: { title: 'Enable Tooltip' }
                    }
                }
            }
        }
    },

    /*
    *   A higher order function to handle value change
    */
    propertyValueChange: (reportPartDetails, fieldStore) => (
        chartProperties,
        schemaData,
        changedKey,
        changedKeyPath,
        changedValue,
        changedOthersInfo
    ) => {
        const tooltipOptions = schemaData.chart['tooltip'];
        chartProperties.optionByType['tooltip'] = tooltipOptions ? tooltipOptions.value : false;
    },

    /**
     * Define which options builder class is using for this chart type
     */
    optionsBuilder: UnleashedLineOptionsBuilder,

    /*
    *   Map the 3d options value into userOptions which is passed into option builder
    */
    optionsMapping: { optionsByType: { 'tooltip': { propKey: 'tooltip.enabled', defaultValue: true } } }

    /*
    * Declare tooltip insight field container
    */
    // fieldContainerSchema: [createFieldContainerSchema('InsightField', 'Insight Field', 'insightValues', null, 1)]

}); 