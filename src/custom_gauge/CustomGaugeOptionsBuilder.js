import $ from 'jquery';
import { getClass, ReportPartUtils } from 'IzendaSynergy';

const HighchartVizEngine = getClass('HighchartVizEngine');
const highcharts = HighchartVizEngine.VisualizationLibrary;

const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
//const HighchartOptionsBuilder = getClass('HighchartOptionsBuilder');
export default class AttainmentGaugeOptionsBuilder extends SolidGaugeOptionsBuilder {
    constructor(...args) {
        super(...args);
    }
    buildOptionsByType(visualType, userOptions, dataParser) {
        let chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);

        let customField = dataParser.dataStructure['test1'][0];

        let currentField = userOptions.series[0]['data'][0]['record'][customField['columnName']];

        $.extend(true, chartOptions, {
            title: {
                text: 'Custom Value: ' + currentField,
                verticalAlign: 'top',
                style: {
                    fontSize: '10px'
                }
            },
        });
        return chartOptions;
    }
}