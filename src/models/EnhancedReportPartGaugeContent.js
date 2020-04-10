import { getClass } from 'IzendaSynergy';

const ReportPartContent = getClass('ReportPartContent');
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

        //this.addCustomContainer('totalAttainment');
        //this.addCustomContainer('actualAmount');
        //this.addCustomContainer('accountName');
        //this.addCustomContainer('accountSequence');
        this.addCustomContainer('totalBudget');
        this.addCustomContainer('accountDescription');

        this.addCustomContainer('test1');
        

    }

    get isBeingBuild() {
        switch (this.chartType) {
            /*
            case 'AttainmentGauge':
                return hasAllFunctions(this['totalAttainment']) && hasAllFunctions(this['actualAmount']) 
                    && hasAllFunctions(this['accountName']) && hasAllFunctions(this['accountSequence']);
            */
           
            case 'AttainmentGauge':
                return super.isBeingBuild && hasAllFunctions(this['totalBudget']) && hasAllFunctions(this['accountDescription']);
            case 'AttainmentGauge':
                return super.isBeingBuild && hasAllFunctions(this['totalBudget']) && hasAllFunctions(this['accountDescription']);
            case 'CustomGauge':
                return super.isBeingBuild && hasAllFunctions(this['test1']);
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