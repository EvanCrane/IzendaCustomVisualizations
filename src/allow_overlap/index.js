import $ from 'jquery';
import AllowOverlapChartOptionsBuilder from './AllowOverlapChartOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createCheckBoxPropertySchema
} from 'IzendaSynergy';

/**
 * Extend the chart visualization by specifying
 *  - Report part type to extend: REPORT_PART_TYPES.Chart
 *  - Style name: 'ColumnNoSpace'
 *  - Base style to extend: CHART_STYLES.Column
 *  - The ColumnNoSpace configuration
 */
extendReportPartStyleConfiguration(REPORT_PART_TYPES.Chart, 'AllowOverlap', CHART_STYLES.Column, {
    /**
     * Visual type to identify which Highchart type to be rendered
     */
    visualType: 'column',
    /**
     * The label text shows in chart type dropdown
     */
    visualLabel: 'Allow Overlap Column',
    /**
     * Define which options builder class is using for this chart type
     */
    optionsBuilder: AllowOverlapChartOptionsBuilder,
});