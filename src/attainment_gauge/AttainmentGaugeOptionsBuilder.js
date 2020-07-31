/* eslint-disable max-len */
import './styles.css';
import $ from 'jquery';
import {get, head, flow} from 'lodash/fp';
import {getClass} from 'IzendaSynergy';
const SolidGaugeOptionsBuilder = getClass('SolidGaugeOptionsBuilder');
/**
 * Class that adds the attainment gauge visualization to Izenda
 */
export default class AttainmentGaugeOptionsBuilder extends SolidGaugeOptionsBuilder {
    // eslint-disable-next-line require-jsdoc
    constructor(...args) {
        super(...args);
    }
    /**
     * Configures visualization build options and settings
     * @param {*} visualType
     * @param {*} userOptions
     * @param {*} dataParser
     * @return {*} Chart highchart configuration and series data
     */
    buildOptionsByType(visualType, userOptions, dataParser) {
        const chartOptions = super.buildOptionsByType(visualType, userOptions, dataParser);
        const izendaSeriesConfig = userOptions.izendaSeriesConfig || {};
        const izendaOptions = userOptions.izendaOptions;
        const plotBands = izendaOptions.threshold ? izendaOptions.threshold : [];
        const serieName = izendaOptions.serieName;

        const actualAmount = dataParser.dataStructure['values'][0];
        const description = dataParser.dataStructure['accountDescription'][0];
        const totalAmount = dataParser.dataStructure['totalBudget'][0];
        // the actual value actual field
        const valueData = get('[0].data[0].y', userOptions.series);
        // Get record values for the current serie
        const [total, orgTotal, actual, orgActual, account] = this.getCustomSeries(userOptions, totalAmount, actualAmount, description);
        // Get calculated percentage
        const calculatedAttainment = this.calculateAttainment(orgActual, orgTotal);
        // Get the correct tick position
        const tickPosition = this.getTickPosition(calculatedAttainment);
        // Automate the sizing of title and top margin
        const [marginSize, titleSize, labelStyle] = this.getSizing(userOptions.commonActions.chartContainer);

        return $.extend(true, chartOptions, {
            chart: {
                type: 'solidgauge',
                marginTop: marginSize,
            },
            title: {
                enabled: true,
                text: getFormattedTitle(),
                useHTML: true,
                verticalAlign: 'top',
                style: {
                    fontSize: titleSize,
                },
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function() {
                    return '<span><b>Account: ' + account + '</b></span><br><table>Actual: ' + getDataFormat(actual, false) + ' ' + izendaOptions.dataUnit + '</table>';
                },
            },
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                    outerRadius: '100%',
                    innerRadius: '75%',
                    borderWidth: 2,
                }],
            },
            yAxis: {
                title: {
                    enabled: false,
                },
                labels: {
                    enabled: false,
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
                    innerRadius: '75%',
                },
                series: {
                    zones: null,
                },
            },

            series: [{
                name: 'Account: ' + account,
                data: [{
                    color: getGaugeColor(),
                    y: calculatedAttainment,
                }],
                dataLabels: {
                    enabled: true,
                    className: 'highlight',
                    formatter: function() {
                        return getFormattedDataLabel();
                    },
                    borderWidth: 0,
                    style: labelStyle,
                    y: -25,
                },
            }],
        });

        /**
         * Will adjust the html text within Izenda's report to show a modified title
         * @return {string} The raw html with data inside
         */
        function getFormattedTitle() {
            // first change header html content
            const chartHeaderContent = userOptions.commonActions.chartContainer.parentElement.parentElement.previousSibling.firstElementChild;
            if (!(chartHeaderContent.classList.contains('custom-header-text'))) {
                chartHeaderContent.classList.add('custom-header-text');
            }
            if (!(chartHeaderContent.textContent.includes(String(account)))) {
                chartHeaderContent.textContent = account;
            }
            // then change the actual highcharts header
            return '<div>' + getDataFormat(actual, false, actualAmount) + ' ' + izendaOptions.dataUnit + '</div>';
        }

        /**
         * Composes the data label html with series data inside
         * @return {string} The raw html for the data label
         */
        function getFormattedDataLabel() {
            const body = '<div>' + calculatedAttainment + '%</div>';
            const footer = '<div class="custom-footer">Of ' + getDataFormat(total, false, totalAmount) + '</div>';
            return '<div class="custom-data-label">' + body + footer + '</div>';
        }

        /**
         * Gets format of the value and will adjust if alternative text is being applied
         * @param {*} value
         * @param {boolean} isApplyAlternativeText
         * @param {*} element
         * @return {*} Returns the dataparser function that Izenda uses for data formats
         */
        function getDataFormat(value, isApplyAlternativeText, element) {
            const record = flow(
                head,
                get('data'),
                head,
                get('record')
            )(userOptions.series);

            const fieldValues = {value: value, originalValue: value};
            const jsFormatString = get('reportPartElm.properties.dataFormattings.format.jsFormatString', element);
            const jsFormatId = get('reportPartElm.properties.dataFormattings.format.formatId', element);
            fieldValues.value = jsFormatString ? jsFormatService.format(jsFormatId, value) : value;

            return dataParser.getFormatData(
                fieldValues,
                izendaSeriesConfig[serieName],
                {
                    record,
                    element,
                },
                isApplyAlternativeText
            );
        }

        /**
         * Calculates the percentage over tick based on the dimensions of its container
         * @return {number} The length of the tick
         */
        function getTickLength() {
            let chartHeight, tickLength = null;
            // Attempt to get the actual height of the rendered SVGs. Will need jquery for this.
            if ($('.highcharts-pane-group')[0] !== undefined) {
                chartHeight = $('.highcharts-pane-group')[0].getBoundingClientRect().height;
                tickLength = (chartHeight / 100) * 10 + 5;
            } else {
                chartHeight = userOptions.commonActions.chartContainer.offsetHeight;
                tickLength = Math.floor(chartHeight / 100) * 10 + 6;
            }
            // returns relatively accurate sizing for tick mark based on above if else block
            return tickLength;
        }

        /**
         * Defines the gauge color depending on the threshold configurations
         * @return {*} The color for the individual gauge
         */
        function getGaugeColor() {
            const defaultColor = '#7CB5EC';
            if (plotBands === []) {
                return defaultColor;
            }
            const thresh = {};
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

    /**
     * Gets the usable data from the izenda defined series
     * @param {*} userOptions
     * @param {*} totalAmount
     * @param {*} actualAmount
     * @param {*} description
     * @return {[*]} Returns the formatted and original data for total and actual and description fields
     */
    getCustomSeries(userOptions, totalAmount, actualAmount, description) {
        let totalSerie = null;
        let orgTotal = null;
        let actualSerie = null;
        let orgActual = null;
        let descriptionSerie = null;

        const currentSerie = userOptions.series[0].data[0];
        if (currentSerie.record &&
            this.checkRecordValue(currentSerie.record[totalAmount.columnName]) &&
            this.checkRecordValue(currentSerie.record[actualAmount.columnName]) &&
            this.checkRecordValue(currentSerie.record[description.columnName])) {
            totalSerie = currentSerie.record[totalAmount.columnName];
            actualSerie = currentSerie.record[actualAmount.columnName];
            descriptionSerie = currentSerie.record[description.columnName];
            // Check the original value of the total without formatting or izenda modification
            if (this.checkRecordValue(currentSerie.record['org_' + totalAmount.columnName])) {
                orgTotal = currentSerie.record['org_' + totalAmount.columnName];
            } else {
                orgTotal = totalSerie;
            }
            // Check the original value of the actual without formatting or izenda modification
            if (this.checkRecordValue(currentSerie.record['org_' + actualAmount.columnName])) {
                orgActual = currentSerie.record['org_' + actualAmount.columnName];
            } else {
                orgActual = actualSerie;
            }
        }
        return [totalSerie, orgTotal, actualSerie, orgActual, descriptionSerie];
    }

    /**
     * Determines whether the record is not zero and falsy
     * @param {*} record
     * @return {boolean} Returns whether its a falsy value that is non zero
     */
    checkRecordValue(record) {
        // Checking in case of a zero value
        if (record || record === 0) {
            return true;
        }
        return false;
    }

    /**
     * Calculates the value of attainment to be displayed on the chart
     * @param {*} actual
     * @param {*} total
     * @return {number} Returns the number the calculated attainment number
     */
    calculateAttainment(actual, total) {
        // Need to account for zero value cases. If total is zero in any case return zero for attainment
        if (!total) {
            return 0;
        }
        return parseFloat(((actual / total) * 100).toFixed(2));
    }

    /**
     * Calculates the tick position based on calculated attainment that is over 100
     * @param {*} calculatedAttainment
     * @return {number} The value 100 and under of attainment
     */
    getTickPosition(calculatedAttainment) {
        if (calculatedAttainment > 100) {
            return calculatedAttainment % 100;
        }
        return 0;
    }

    /**
     * Gets the container sizing for the gauge labels
     * @param {*} container
     * @return {*} Returns sizes for the margin title and label
     */
    getSizing(container) {
        let marginSize, titleSize = null;
        let labelStyle = {};
        if (container.offsetHeight < 250) {
            marginSize = 25;
            titleSize = '14px';
            labelStyle = {
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
