//Import the activity gauge options
import AttainmentGaugeOptionsBuilder from './AttainmentGaugeOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Chart, 'Solid Gauge', null, {
    visualType: 'izendaSolidGauge',
    visualLabel: 'Attainment',
    optionsBuilder: AttainmentGaugeOptionsBuilder,
    fieldContainerSchema: [
        createFieldContainerSchema('values', 'Total Attainment', 'values', null, 1),
        createFieldContainerSchema('actualAmount', 'Actual Amount', 'actualAmount', null, 1),
        createFieldContainerSchema('accountName', 'Account Name', 'accountName', null, 1),
        createFieldContainerSchema('labels', 'Account Sequence', 'labels', null, 1)
]
});