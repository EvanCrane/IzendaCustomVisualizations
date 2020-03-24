import $ from 'jquery';
import './styles.css';
import { getClass, ReportPartUtils } from 'IzendaSynergy';

const HighchartVizEngine = getClass('HighchartVizEngine');
const highcharts = HighchartVizEngine.VisualizationLibrary;

const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
const HighchartOptionsBuilder = getClass('HighchartOptionsBuilder');
export default class AttainmentGaugeOptionsBuilder extends HighchartOptionsBuilder {
    constructor(...args) {
        super(...args);
    }
    buildOptionsByType(visualType, userOptions, dataParser) {
        const totalAttainment = dataParser.dataStructure['totalAttainment'][0];
        const actualAmount = dataParser.dataStructure['actualAmount'][0];
        const accountName = dataParser.dataStructure['accountName'][0];
        const accountSequence = dataParser.dataStructure['accountSequence'][0];

        let total = 100;
        let actual = 175;
        let account = 'ACCOUNT NAME';
        // Percentange Calculated
        let calculatedAttainment = calculateAttainment();

        let tickPosition = getTickPositon();

        let chartConfigs = {
            chart: {
                type: 'solidgauge',
                marginTop: 25
            },
            legend: {
                enabled: false
            },
            title: {
                text: total,
                verticalAlign: 'top',
                style: {
                    fontSize: '24px'
                }
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    return '<span><b>Account: ' + account + '</b></span><br><table>Actual: ' + actual + '</table>';
                }
                //headerFormat: '<span><b>Account: Stone Cost - PHILADELPHIA</b> </span><br><table>',
                //pointFormat: 'Actual: ' + actual,
                //footerFormat: '</table>'
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '100%',
                    innerRadius: '75%',
                    borderWidth: 2
                }]
            },
            yAxis: {
                title: {
                    enabled: false
                },
                labels: {
                    enabled: false
                },
                min: 0,
                max: 100,
                lineWidth: 0,
                gridLineColor: 'transparent',
                lineColor: 'transparent',
                minorTickLength: 0,
                tickPositions: [tickPosition],
                tickColor: '#000000',
                tickPosition: 'inside',
                tickLength: 40,
                tickWidth: 5,
                zIndex: 100,
            },
            plotOptions: {
                solidgauge: {
                    linecap: 'square',
                    stickyTracking: false,
                    rounded: false
                }
            },
            series: [{
                name: 'Account: ' + account,
                data: [{
                    radius: '100%',
                    innerRadius: '75%',
                    y: calculatedAttainment,
                }],
                dataLabels: {
                    enabled: true,
                    className: 'highlight',
                    formatter: function () {
                        return '<b>' + calculatedAttainment + '%</b>';
                    },
                    borderWidth: 0,
                    style: {
                        fontSize: '30px',
                        fontWeight: 'bold'
                    },
                    y: -20
                }
            }]
        };

        function calculateAttainment() {
            return (actual / total) * 100;
        }

        function getTickPositon() {
            if (calculatedAttainment > 100) {
                return calculatedAttainment % 100;
            }
            return 0;
        }

        return chartConfigs;
    }
}