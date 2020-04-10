import './styles.css';
import $ from 'jquery';
import { get, isNil, head, flow } from 'lodash/fp';
import { getClass, ReportPartUtils } from 'IzendaSynergy';
const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
//const HighchartOptionsBuilder = getClass('HighchartOptionsBuilder');
export default class AttainmentGaugeOptionsBuilder extends SolidGaugeOptionsBuilder {
    constructor(...args) {
        super(...args);
    }

    buildOptionsByType(visualType, userOptions, dataParser) {
        const chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);
        const izendaSeriesConfig = userOptions.izendaSeriesConfig || {};
        const izendaOptions = userOptions.izendaOptions;
        const valueData = get('[0].data[0].y', userOptions.series);
        const serieName = izendaOptions.serieName;

        const sequence = dataParser.dataStructure['labels'][0];
        const actualAmount = dataParser.dataStructure['values'][0];
        const separators = dataParser.dataStructure['values'][0];
        const description = dataParser.dataStructure['accountDescription'][0];
        const totalAmount = dataParser.dataStructure['totalBudget'][0];

        // Get record values for the current serie
        let [total, actual, account] = this.getCustomSeries(userOptions, totalAmount, actualAmount, description);
        // Get calculated percentage
        let calculatedAttainment = this.calculateAttainment(actual, total);

        //let [formattedTotal, formattedActual] = formatSeries();

        // Get the correct tick position
        let tickPosition = this.getTickPosition(calculatedAttainment);

        //let [formattedActual, formattedTotal] = getFormattedData();


        return $.extend(true, chartOptions, {
            chart: {
                type: 'solidgauge',
                marginTop: 25
            },
            legend: {
                enabled: false
            },
            title: {
                text: getFormattedTitle(),
                useHTML: true,
                verticalAlign: 'top',
                style: {
                    fontSize: '24px'
                }
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    return '<span><b>Account: ' + account + '</b></span><br><table>Actual: ' + getDataFormat(actual, false) + '</table>';
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
                        return getFormattedDataLabel();
                    },
                    borderWidth: 0,
                    style: {
                        fontSize: '18px',
                        fontWeight: 'bold',
                        top: 0
                    },
                    y: -30
                }
            }]
        });


        function getFormattedTitle() {
            // first change header html content
            let chartHeaderContent = userOptions.commonActions.chartContainer.parentElement.parentElement.previousSibling.firstElementChild;
            if (!(chartHeaderContent.classList.contains('custom-header-text'))) {
                chartHeaderContent.classList.add('custom-header-text');
            }
            if (!(chartHeaderContent.textContent.includes(String(account)))) {
                chartHeaderContent.textContent += ' ' + account;
            }
            // then change the actual highcharts header
            return '<div>' + getDataFormat(actual, false) + '</div>';
        }

        function getFormattedDataLabel() {
            let body = '<div>' + calculatedAttainment + '%</div>';
            let footer = '<div class="custom-footer">Of ' + getDataFormat(total, false) + '</div>';
            return '<div class="custom-data-label">' + body + footer + '</div>';
        }

        function getDataFormat(value, isApplyAlternativeText) {
            const record = flow(
                head,
                get('data'),
                head,
                get('record')
            )(userOptions.series);
            const element = flow(
                head,
                get('yAxisField')
            )(userOptions.series);

            const fieldValues = { value: value, originalValue: value };
            const jsFormatString = get('reportPartElm.properties.dataFormattings.format.jsFormatString', element);
            const jsFormatId = get('reportPartElm.properties.dataFormattings.format.formatId', element);
            fieldValues.value = jsFormatString ? jsFormatService.format(jsFormatId, value) : value;

            return dataParser.getFormatData(
                fieldValues,
                izendaSeriesConfig[serieName],
                {
                    record,
                    element
                },
                isApplyAlternativeText
            );
        }

    }

    getCustomSeries(userOptions, totalAmount, actualAmount, description) {
        let totalSerie = null;
        let actualSerie = null;
        let descriptionSerie = null;
        const currentSerie = userOptions.series[0].data[0];
        if (currentSerie.record
            && currentSerie.record[totalAmount.columnName]
            && currentSerie.record[actualAmount.columnName]
            && currentSerie.record[description.columnName]) {
            totalSerie = currentSerie.record[totalAmount.columnName];
            actualSerie = currentSerie.record[actualAmount.columnName];
            descriptionSerie = currentSerie.record[description.columnName];
        }
        return [totalSerie, actualSerie, descriptionSerie];
    }

    calculateAttainment(actual, total) {
        return parseFloat(((actual / total) * 100).toFixed(2));
    }

    getTickPosition(calculatedAttainment) {
        if (calculatedAttainment > 100) {
            return calculatedAttainment % 100;
        }
        return 0;
    }
}