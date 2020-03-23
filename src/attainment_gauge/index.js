//Import the activity gauge options
import AttainmentGaugeOptionsBuilder from './AttainmentGaugeOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Gauge, 'AttainmentGauge', null, {
    visualType: 'izendaSolidGauge',
    visualLabel: 'Attainment Gauge',
    optionsBuilder: AttainmentGaugeOptionsBuilder,
    fieldContainerSchema: [createFieldContainerSchema('values', 'Custom Test', 'values', null, 1)]
});