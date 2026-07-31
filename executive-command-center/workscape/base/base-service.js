/*
==========================================================
SKOS Framework
Base Service
Version : 1.0.0
BUILD : BUILD-000021
==========================================================
*/

class BaseService {

    constructor() {

        this.data = null;

        this.initialized = false;

        this.source = null;

    }

    async initialize() {

        this.initialized = true;

        console.info(
            "[BaseService] Initialized"
        );

    }

    isReady() {

        return this.initialized;

    }

    setSource(source) {

        this.source = source;

    }

    getSource() {

        return this.source;

    }

    setData(data) {

        this.data = data;

    }

    getData() {

        return this.data;

    }

    async load() {

        console.warn(
            "[BaseService] load() must be overridden."
        );

    }

    async reload() {

        this.data = null;

        return await this.load();

    }

    clear() {

        this.data = null;

    }

    async shutdown() {

        this.clear();

        this.initialized = false;

        console.info(
            "[BaseService] Shutdown"
        );

    }

}

export default BaseService;
