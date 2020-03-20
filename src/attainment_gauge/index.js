//Import the activity gauge options
import AttainmentGaugeOptionsBuilder from './AttainmentGaugeOptionsBuilder';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';
import { getClass, ReportPartUtils } from 'IzendaSynergy';
const PieChartOptionsBuilder = getClass('PieChartOptionsBuilder');

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Chart, 'AttainmentGauge', null, {
    visualType: 'solidgauge',
    visualLabel: 'Attainment Gauge',
    fieldContainerSchema: [
        createFieldContainerSchema('total', 'Total Attainment', 'total', null, 1),
        createFieldContainerSchema('actual', 'Actual Attainment', 'actual', null, 1),
        createFieldContainerSchema('account', 'Account', 'account', null, 1)
    ],
    optionsBuilder: AttainmentGaugeOptionsBuilder,
});