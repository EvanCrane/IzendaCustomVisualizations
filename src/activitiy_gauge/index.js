//Import the activity gauge options
import ActivityGaugeOptionsBuilder from './ActivityGaugeOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

// import ActivityGaugeVizEngine from './ActivityGaugeVizEngine';


//registerVisualizationEngine('ActivityGauge', ActivityGaugeVizEngine);

/**
 * Defined in ui/api/Izenda.ReportPartApi.js
 * Extend the chart visualization by specifying
 * @param {string} reportPartType The report part type
 * This will be defining what type of chart we are using 
 * - Report part type to extend: REPORT_PART_TYPES.Gauge
 * @param {string} reportPartStyle The new report part style
 * This is the new report part style that we are defining
 * @param {string} baseStyle A chart type that new chart derives on
 * This would be used to define a base style to exend. We may not need this for this custom gauge.
 * @param {Object} configuration New chart type configuration
 * We will define our activity gauge configuration here
 */

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Gauge, 'ActivityGauge', CHART_STYLES.SolidGauge, {
    /** 
    * The name of visualization engine. 
    * The default visualization engine which is defined in report part configuration is used if it doesn't specify here.
    */
    //visualEngine: 'ActivityGauge',

    /**
    * Visual type to identify which visualization type to be rendered. 
    * For example, it would be "type" property of Highchart options.
    */
    visualType: 'izendaSolidGauge',

    /**
    * The label text of this report part style showing in the chart type dropdown of report designer.
    */
    visualLabel: 'Activity Gauge',

    /**
    * The options builder class or constructor function to build visualization options
    */
    optionsBuilder: ActivityGaugeOptionsBuilder,

    /**
    * An array of field container schema.
    */
    // We would need to figure out what field containers we need
    // fieldContainerSchema: TBD,

    //fieldContainerSchema:
    //[createFieldContainerSchema('labels', 'Total Attainment', 'labels', 50, 1)]
    //createFieldContainerSchema('values', 'Actual Attainment', 'values', null, 1),
    //createFieldContainerSchema('separators', 'Separator', 'separators', null, 1)]

    /**
    * An array of custom React components to create property editor.
    * It would be useful in case of using a custom React component directly in the propertySchema property, instead of using registerPropertyEditor to register a custom property editor by type.
    */
    // We would need to figure out if we need to utilize the custom React components for this gauge.
    //propertyWidgets: TBD,

    /** 
    * The object contains defined schema of property editor of report part in designer
    * This would also include its functions for mapping properties, source, and change handler. 
    * Useful for custom properties 
    */
    // Would we need to find out what properties need to be created and set in order for it to communicate with the chart builder and engine
    //propertySchema: TBD,
    //propertyMappingProps: TBD,
    //propertyMappingSource: TBD,
    //propertyValueChange: TBD,
    //optionsMapping: TDB,
});
