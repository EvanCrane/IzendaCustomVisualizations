import StackedChartOptionsBuilder from './StackedChartOptionsBuilder.js';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createFieldContainerSchema
} from 'IzendaSynergy';

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Chart, 'StackedColumn', CHART_STYLES.Combination, {
    visualType: 'Combination',
    visualLabel: 'Stacked Chart',
    optionsBuilder: StackedChartOptionsBuilder
});