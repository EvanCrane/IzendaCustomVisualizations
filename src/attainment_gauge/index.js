//Import the activity gauge options
import AttainmentGaugeOptionsBuilder from './AttainmentGaugeOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Gauge, 'AttainmentGauge', null, {
    visualType: 'solidGauge',
    visualLabel: 'Attainment Gauge',
    optionsBuilder: AttainmentGaugeOptionsBuilder,
    fieldContainerSchema: [
        createFieldContainerSchema('values', 'Total Attainment', 'values', null, 1),
        
        createFieldContainerSchema('actualAmount', 'Actual Amount', 'actualAmount', null, 1),
        createFieldContainerSchema('accountName', 'Account Name', 'accountName', null, 1),
        createFieldContainerSchema('accountSequence', 'Account Sequence', 'accountSequence', null, 1),

        
]
});