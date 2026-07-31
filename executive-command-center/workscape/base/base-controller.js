/*
==========================================================
SKOS Framework
Base Controller
Version : 1.0.0
BUILD : BUILD-000020
==========================================================
*/

class BaseController {

    constructor() {

        this.initialized = false;

        this.data = null;

    }

    async initialize() {

        this.initialized = true;

        console.info(

            "[BaseController] Initialized"

        );

    }

    isReady() {

        return this.initialized;

    }

    setData(data) {

        this.data = data;

    }

    getData() {

        return this.data;

    }

    async refresh() {

        console.info(

            "[BaseController] Refresh"

        );

    }

    reset() {

        this.data = null;

    }

    async shutdown() {

        this.reset();

        this.initialized = false;

        console.info(

            "[BaseController] Shutdown"

        );

    }

}
export default BaseController;
