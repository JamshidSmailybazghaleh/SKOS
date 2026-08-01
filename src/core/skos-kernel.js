/**
 * SKOS Kernel
 * Smaily Knowledge Operating System
 *
 * Core Runtime
 *
 * Version: 1.0.0
 * Build: BUILD-000001
 */

class SKOSKernel {

    constructor(config = {}) {

        this.name = "SKOS";
        this.version = "1.0.0";
        this.build = "BUILD-000001";

        this.status = "CREATED";

        this.config = config;

        this.engines = new Map();

        this.events = [];

        this.startTime = null;
    }


    /**
     * Initialize SKOS Kernel
     */
    initialize() {

        this.startTime = new Date();

        this.status = "INITIALIZED";

        this.logEvent(
            "KERNEL_INITIALIZED"
        );

        return {
            status: this.status,
            version: this.version,
            build: this.build
        };
    }


    /**
     * Register Engine
     */
    registerEngine(
        name,
        engine
    ) {

        this.engines.set(
            name,
            engine
        );

        this.logEvent(
            `ENGINE_REGISTERED:${name}`
        );

        return true;
    }


    /**
     * Execute Engine
     */
    executeEngine(
        name,
        payload = {}
    ) {

        const engine =
            this.engines.get(name);


        if (!engine) {

            throw new Error(
                `Engine not found: ${name}`
            );
        }


        this.logEvent(
            `ENGINE_EXECUTE:${name}`
        );


        return engine.execute(
            payload
        );
    }


    /**
     * System Status
     */
    getStatus() {

        return {

            name: this.name,

            version: this.version,

            build: this.build,

            status: this.status,

            engines:
                Array.from(
                    this.engines.keys()
                ),

            events:
                this.events.length
        };
    }


    /**
     * Event Logger
     */
    logEvent(event) {

        this.events.push({

            event,

            timestamp:
                new Date()

        });

    }


    /**
     * Shutdown Kernel
     */
    shutdown() {

        this.status =
            "SHUTDOWN";


        this.logEvent(
            "KERNEL_SHUTDOWN"
        );


        return true;
    }

}


module.exports = SKOSKernel;
