import { getClass } from 'IzendaSynergy';

const ReportPartChartContent = getClass('ReportPartChartContent');

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

/**
 * Extend existing ReportPartChartContent model for additional custom charts
 */
export default class EnhancedReportPartChartContent extends ReportPartChartContent {
	constructor(reportPartContent) {
		super(reportPartContent);

	}

	/**
* Override this properties to ensure all required fields exist and configured properly
*/
	get isBeingBuild() {
		switch (this.chartType) {
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
