/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SKOS Alpha Runtime
 * File      : skos-alpha-runtime.js
 *
 * Build     : BUILD-000500.1
 * Version   : 1.0.0
 *
 * Mission:
 * First integrated executable runtime for SKOS.
 * ==========================================================
 */

const BootstrapRuntime =
    require("./skos-bootstrap-runtime");

const SKOSKernel =
    require("../core/skos-kernel");

const EngineOrchestrator =
    require("../kernel/engine-orchestrator");

const StartupManager =
    require("./startup-manager");

const SDKCRuntimeConnector =
    require("./sdkc-runtime-connector");

class SKOSAlphaRuntime {

    constructor() {

        this.name = "SKOS Alpha Runtime";
        this.version = "1.0.0";
        this.build = "BUILD-000500.1";

        this.status = "CREATED";

        this.bootstrap = new BootstrapRuntime();

        this.kernel = new SKOSKernel();

        this.orchestrator =
            new EngineOrchestrator();

        this.startup =
            new StartupManager();

        this.sdkc =
            new SDKCRuntimeConnector();

        this.startedAt = null;
    }



    initialize() {

        this.startup.attachBootstrap(
            this.bootstrap
        );

        this.startup.attachKernel(
            this.kernel
        );

        this.startup.attachOrchestrator(
            this.orchestrator
        );

        this.status = "INITIALIZED";

        return true;
    }

    /**
     * ==================================================
     * ILR-001.75-D10-P4-C9-F1-K
     * OPERATIONAL RECONCILIATION INVOCATION
     *
     * Explicit invocation only.
     * No automatic reconciliation during
     * construction, initialization, or startup.
     * ==================================================
     */
    reconcile(options = {}) {
        if (
            this.status !== "INITIALIZED" &&
            this.status !== "RUNNING"
        ) {
            throw new Error(
                `Repository reconciliation is not permitted while runtime status is ${this.status}.`
            );
        }

        return this.reconciliation.enforcePolicy(options);
    }

    start() {
start() {

    if (
        this.status !== "INITIALIZED"
    ) {

        this.initialize();

    }

    this.startedAt =
        new Date();

    try {

        this.startup.run();

        this.status = "RUNNING";

        return true;

    } catch (error) {

        this.status = "FAILED";

        throw error;

    }

}



    stop() {

        this.startup.shutdown();

        this.status = "STOPPED";

        return true;
    }



    isReady() {

        return (
            this.status === "RUNNING"
        );

    }



    getRuntimeState() {

        return {

            runtime:

                this.name,

            version:

                this.version,

            build:

                this.build,

            status:

                this.status,

            startedAt:

                this.startedAt,

            bootstrap:

                this.bootstrap.status,

            kernel:

                this.kernel.status,

            orchestrator:

                this.orchestrator.status,

            startup:

                this.startup.status,

            sdkc:

                this.sdkc.status

        };

    }



    printSummary() {

        const state =
            this.getRuntimeState();

        console.log("");

        console.log(
            "======================================"
        );

        console.log(
            "SKOS Alpha Runtime"
        );

        console.log(
            "Version :",
            state.version
        );

        console.log(
            "Build   :",
            state.build
        );

        console.log(
            "Status  :",
            state.status
        );

        console.log(
            "======================================"
        );

        return state;
    }

}

module.exports =
    SKOSAlphaRuntime;
