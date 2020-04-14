import './styles.css';
import $ from 'jquery';
import { get, isNil, head, flow } from 'lodash/fp';
import { getClass, ReportPartUtils } from 'IzendaSynergy';
const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
export default class AttainmentGaugeOptionsBuilder extends SolidGaugeOptionsBuilder {
    constructor(...args) {
        super(...args);
    }

    buildOptionsByType(visualType, userOptions, dataParser) {
        const chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);
        const izendaSeriesConfig = userOptions.izendaSeriesConfig || {};
        const izendaOptions = userOptions.izendaOptions;
        const plotBands = izendaOptions.threshold ? izendaOptions.threshold : [];
        const serieName = izendaOptions.serieName;

        const sequence = dataParser.dataStructure['labels'][0];
        const actualAmount = dataParser.dataStructure['values'][0];
        const separators = dataParser.dataStructure['values'][0];
        const description = dataParser.dataStructure['accountDescription'][0];
        const totalAmount = dataParser.dataStructure['totalBudget'][0];
        // the actual value actual field
        const valueData = get('[0].data[0].y', userOptions.series);
        // Get record values for the current serie
        let [total, orgTotal, actual, account] = this.getCustomSeries(userOptions, totalAmount, actualAmount, description);
        // Get calculated percentage
        let calculatedAttainment = this.calculateAttainment(valueData, orgTotal);
        // Get the correct tick position
        let tickPosition = this.getTickPosition(calculatedAttainment);
        // Automate the sizing of title and top margin
        let [marginSize, titleSize, labelStyle] = this.getSizing(userOptions.commonActions.chartContainer);

        return $.extend(true, chartOptions, {
            chart: {
                type: 'solidgauge',
                marginTop: marginSize
            },
            title: {
                enabled: true,
                text: getFormattedTitle(),
                useHTML: true,
                verticalAlign: 'top',
                style: {
                    fontSize: titleSize
                }
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    return '<span><b>Account: ' + account + '</b></span><br><table>Actual: ' + getDataFormat(actual, false) + '</table>';
                }
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
                plotBands: null,
                lineWidth: 0,
                gridLineColor: 'transparent',
                lineColor: 'transparent',
                minorTickLength: 0,
                tickPositions: [tickPosition],
                tickColor: '#000000',
                tickPosition: 'inside',
                tickLength: getTickLength(),
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
                },
                series: {
                    zones: null
                }
            },

            series: [{
                name: 'Account: ' + account,
                data: [{
                    color: getGaugeColor(),
                    y: calculatedAttainment
                }],
                dataLabels: {
                    enabled: true,
                    className: 'highlight',
                    formatter: function () {
                        return getFormattedDataLabel();
                    },
                    borderWidth: 0,
                    style: labelStyle,
                    y: -25
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
            return '<div>' + getDataFormat(actual, false, actualAmount) + '</div>';
        }

        function getFormattedDataLabel() {
            let body = '<div>' + calculatedAttainment + '%</div>';
            let footer = '<div class="custom-footer">Of ' + getDataFormat(total, false, totalAmount) + '</div>';
            return '<div class="custom-data-label">' + body + footer + '</div>';
        }

        function getDataFormat(value, isApplyAlternativeText, element) {
            const record = flow(
                head,
                get('data'),
                head,
                get('record')
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

        function getTickLength() {
            let chartHeight = userOptions.commonActions.chartContainer.offsetHeight;
            /*
            if (chartHeight <= 100) {
                return 3;
            } else if (chartHeight <= 200) {
                return 16;
            } else if (chartHeight <= 300) {
                return 26;
            } else if (chartHeight <= 400) {
                return 36;
            } else if (chartHeight <= 500) {
                return 46;
            }
            return 35;
            */
           // returns relatively accurate sizing for tick mark based on above if else block
           return Math.floor(chartHeight/100) * 10 + 6;
        }

        function getGaugeColor() {
            let defaultColor = '#7CB5EC';
            if (plotBands === []) {
                return defaultColor;
            }
            let thresh = {};
            thresh.low = plotBands[0];
            thresh.target = plotBands[1];
            thresh.high = plotBands[2];
            if (thresh.low != undefined && valueData < thresh.low.to) {
                return thresh.low.color;
            } else if (thresh.target != undefined && valueData >= thresh.target.from && valueData <= thresh.target.to) {
                return thresh.target.color;
            } else if (thresh.high != undefined && valueData > thresh.high.from) {
                return thresh.high.color;
            }
            return defaultColor;
        }
    }

    getCustomSeries(userOptions, totalAmount, actualAmount, description) {
        let totalSerie = null;
        let orgTotal = null;
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
            if (currentSerie.record['org_'+totalAmount.columnName]) {
                orgTotal = currentSerie.record['org_'+totalAmount.columnName];
            } else {
                orgTotal = totalSerie;
            }
        }
        return [totalSerie, orgTotal, actualSerie, descriptionSerie];
    }

    calculateAttainment(valueData, total) {
        return parseFloat(((valueData / total) * 100).toFixed(2));
    }

    getTickPosition(calculatedAttainment) {
        if (calculatedAttainment > 100) {
            return calculatedAttainment % 100;
        }
        return 0;
    }

    getSizing(container) {
        let marginSize, titleSize = null;
        let labelStyle = {};
        if (container.offsetHeight < 250) {
            marginSize = 25;
            titleSize = '14px';
            labelStyle =  {
                fontSize: '12px',
                fontWeight: 'bold',
                top: 5,
            };
        } else {
            marginSize = 15;
            titleSize = '18px';
            labelStyle = {
                fontSize: '14px',
                fontWeight: 'bold',
                top: 0,
            };
        }
        return [marginSize, titleSize, labelStyle];
    }
}