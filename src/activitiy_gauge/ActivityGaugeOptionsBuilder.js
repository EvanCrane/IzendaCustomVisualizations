import {getClass} from 'IzendaSynergy';

import {DATA_TYPE, DEFAULT_COLORS} from './../utils/CustomVizConstant';
import {helpers} from './../utils/CustomVizHelper';

const HighchartOptionsBuilder = getClass('HighchartsOptionsBuilder');

export default class ActivityGaugeOptionsBuilder extends HighchartsOptionsBuilder {
    constructor(...baseargs) {
        super(...baseargs);
    }

    /**
    * The blank slate for creating the chart options and how the chart will integrate with Izenda's data
    */

}