import CustomGaugeOptionsBuilder from './CustomGaugeOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Gauge, 'CustomGauge', null, {
    visualType: 'izendaSolidGauge',
    visualLabel: 'Custom Gauge',
    optionsBuilder: CustomGaugeOptionsBuilder,
    fieldContainerSchema: [createFieldContainerSchema('test1', 'Test Custom Field', 'test1', null, 1)
    ]
});