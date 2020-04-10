//Import the attainment gauge options
import AttainmentGaugeOptionsBuilder from './AttainmentGaugeOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Gauge, 'AttainmentGauge', CHART_STYLES.SolidGauge, {
    visualType: 'izendaSolidGauge',
    visualLabel: 'Attainment',
    optionsBuilder: AttainmentGaugeOptionsBuilder,
    fieldContainerSchema: [
        createFieldContainerSchema('totalBudget', 'Total Budget', 'totalBudget', null, 1),
        createFieldContainerSchema('accountDescription', 'Description', 'accountDescription', null, 1)
]
});