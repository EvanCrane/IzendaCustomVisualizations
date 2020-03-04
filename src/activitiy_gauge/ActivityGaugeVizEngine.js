import { getClass } from 'IzendaSynergy';

const VizEngine = getClass('VizEngine');

export default class ActivityGaugeVizEngine extends VizEngine {
    constructor(...args) {
        super(...args);
    }
    
    /**
    * Blank slate for the custom viz engine that we may need when using this new chart type.
    */
}