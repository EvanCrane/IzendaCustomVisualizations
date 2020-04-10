import $ from 'jquery';
import './styles.css';
import { getClass, ReportPartUtils } from 'IzendaSynergy';

const HighchartVizEngine = getClass('HighchartVizEngine');
//const highcharts = HighchartVizEngine.VisualizationLibrary;

//const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
const HighchartOptionsBuilder = getClass('HighchartOptionsBuilder');
export default class AttainmentGaugeOptionsBuilder extends HighchartOptionsBuilder {
    constructor(...args) {
        super(...args);
    }
    buildOptionsByType(visualType, userOptions, dataParser) {
        const records = dataParser['records'];
        const sequence = dataParser.dataStructure['labels'][0];
        const totalAttainment = dataParser.dataStructure['values'][0];
        const actualAmount = dataParser.dataStructure['actualAmount'][0];
        const accountName = dataParser.dataStructure['accountName'][0];

        const seriesConfig = userOptions.izendaSeriesConfig;

        //const accountSequence = dataParser.dataStructure['accountSequence'][0];

        let [total, actual, account] = getCustomSeries();
        // Percentange Calculated
        let calculatedAttainment = calculateAttainment();
        let [formattedTotal, formattedActual] = formatSeries();
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
                text: formattedTotal,
                verticalAlign: 'top',
                style: {
                    fontSize: '24px'
                }
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    return '<span><b>Account: ' + account + '</b></span><br><table>Actual: ' + formattedActual + '</table>';
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
                tickLength: 35,
                tickWidth: 3,
                zIndex: 100,
            },
            plotOptions: {
                solidgauge: {
                    linecap: 'square',
                    stickyTracking: false,
                    rounded: false,
                    radius: '100%',
                    innerRadius: '75%'
                }
            },
            series: [{
                name: 'Account: ' + account,
                data: [{
                    y: calculatedAttainment
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

        function getCustomSeries() {
            let totalSerie = null;
            let actualSerie = null;
            let accountSerie = null;
            const currentSerie = userOptions.series[0].data[0];
            if (currentSerie.record
                && currentSerie.record[totalAttainment.columnName]
                && currentSerie.record[actualAmount.columnName]
                && currentSerie.record[accountName.columnName]) {
                totalSerie = currentSerie.record[totalAttainment.columnName];
                actualSerie = currentSerie.record[actualAmount.columnName];
                accountSerie = currentSerie.record[accountName.columnName];
            }
            return [totalSerie, actualSerie, accountSerie];
        }

        function calculateAttainment() {
            return parseFloat(((actual / total) * 100).toFixed(2));
        }

        function formatSeries() 
            const totalData = {};
            const actualData = {};
            totalData.formatData = seriesConfig[totalAttainment.fieldNameAlias].fieldFormatData;
            actualData.formatData = seriesConfig[actualAmount.fieldNameAlias].fieldFormatData;
            totalData.data = total;
            actualData.data = actual;
            const values = [totalData, actualData];
            const formattedValues = values.map(value => {
                switch (value.formatData) {
                    case '0.00':
                        return formatNumber(value.data, true, false, null);
                    case '0,000.00':
                        return formatNumber(value.data, true, true, null);
                    case '0,000':
                        return formatNumber(value.data, false, true, null);
                    case '0000':
                        return value.data;
                    case '$0.00':
                        return formatNumber(value.data, true, false, '$');
                    case '$0,000.00':
                        return formatNumber(value.data, true, true, '$');
                    case '$0000':
                        return formatNumber(value.data, false, false, '$');
                    case '$0.00':
                        return formatNumber(value.data, true, false, '$');
                    case '1K':
                        return formatNumberWithDividend(value.data, 1000, 'Abbreviation', 'K');
                    case '1M':
                        return formatNumberWithDividend(value.data, 1000000, 'Abbreviation', 'M');
                    case '1B':
                        return formatNumberWithDividend(value.data, 1000000000, 'Abbreviation', 'B');
                    default:
                        return value.data;
                }
            });
            return formattedValues;
        }

        function formatNumber(value, hasDecimal, hasComma, currency) {
            let formattedValue = value;
            if (hasDecimal) {
                formattedValue = parseFloat(formattedValue.toFixed(2));
            }
            if (hasComma) {
                formattedValue = formattedValue.toLocaleString();
            }
            if (currency) {
                formattedValue = currency + formattedValue;
            }
            return formattedValue.toString();

        }
        function formatNumberWithDividend(value, dividendNumber, formatType, symbol) {
            const absValue = Math.abs(value / dividendNumber);
            const isNegative = value < 0;
            return `${isNegative ? '-' : ''}${numeral(absValue).format(FORMAT_TYPE[formatType])}${symbol}`;
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