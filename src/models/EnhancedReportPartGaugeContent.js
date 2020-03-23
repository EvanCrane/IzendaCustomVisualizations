import { getClass } from 'IzendaSynergy';

const ReportPartGaugeContent = getClass('ReportPartGaugeContent');

const hasElement = container => container && container.elements && container.elements.length > 0;

/**
 * Determine whether all fields in container has function (Group, Sum, Count...) setting.
 * @param {Object} container The field container object
 */
const hasAllFunctions = container => {
    if (!hasElement(container)) {
        return false;
    }

    let hasFunction = true;

    container
        .elements
        .forEach(elm => (hasFunction = hasFunction && elm.haveFunction));

    return hasFunction;
};

export default class EnhancedReportPartGauge extends ReportPartGaugeContent {
    constructor(reportPartContent) {
        super(reportPartContent);

        this.addCustomContainer('startRange');
		this.addCustomContainer('endRange');
		this.addCustomContainer('customtest');
    }

    get isBeingBuild() {
        switch (this.chartType) {
            case 'AttainmentGauge':
                return hasAllFunctions(this['values']);
            default:
                return super.isBeingBuild;
        }
    }

    getDefaultFunctionFormat(container, dataType) {
        return (super.getDefaultFunctionFormat(container, dataType) || {
            FUNCTION: {
                NAME: 'Group'
            },
            FORMAT: '',
            ON_NULL_FUNCTION: 'error'
        });
    }
}