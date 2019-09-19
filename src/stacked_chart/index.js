import StackedChartOptionsBuilder from './StackedChartOptionsBuilder.js';
import {
    REPORT_PART_TYPES,
    CHART_STYLES,
    extendReportPartStyleConfiguration,
    createCheckBoxPropertySchema
} from 'IzendaSynergy';

extendReportPartStyleConfiguration(REPORT_PART_TYPES.Chart, 'StackedColumn', CHART_STYLES.Combination, {
    visualType: 'Combination',
    visualLabel: 'Stacked Chart',
    optionsBuilder: StackedChartOptionsBuilder,
    /*
    *   A higher order function to handle value change
    */
    /*
    propertyValueChange: (reportPartDetails, fieldStore) => (
        chartProperties,
        schemaData,
        changedKey,
        changedKeyPath,
        changedValue,
        changedOthersInfo
    ) => {
        const izSingleYAxis = schemaData.view['izSingleYAxis'];
        chartProperties.optionByType['izSingleYAxis'] = izSingleYAxis.value ? izSingleYAxis.value : true;
    },
    */
   
    /*
    *   Map the 3d options value into userOptions which is passed into option builder
    */
    // Make sure that SingleYAxis property defaults to true on chart init
    optionsMapping: {
        optionsByType: {
            izSingleYAxis: { defaultValue: true }
        }
    }
});