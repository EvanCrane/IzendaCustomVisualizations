import EnhancedReportPartChartContent from './EnhancedReportPartChartContent';
import EnhancedReportPartMapContent from './EnhancedReportPartMapContent';
import {REPORT_PART_TYPES, getReportPartConfiguration, setReportPartConfiguration} from 'IzendaSynergy';

/**
 * Extend the model class to add a custom field container
 */
const chartConfiguration = getReportPartConfiguration(REPORT_PART_TYPES.Chart);
chartConfiguration.model = EnhancedReportPartChartContent;
setReportPartConfiguration(REPORT_PART_TYPES.Chart, chartConfiguration);

const mapConfiguration = getReportPartConfiguration(REPORT_PART_TYPES.Map);
mapConfiguration.model = EnhancedReportPartMapContent;
setReportPartConfiguration(REPORT_PART_TYPES.Map, mapConfiguration);
