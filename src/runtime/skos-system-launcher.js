/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : SKOS System Launcher
 * File      : skos-system-launcher.js
 *
 * Build     : BUILD-000451
 * Version   : 1.0.0
 *
 * Mission:
 * Launch complete SKOS runtime.
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



class SKOSSystemLauncher {

    constructor() {

        this.version = "1.0.0";

        this.status = "CREATED";

        this.bootstrap =
            new BootstrapRuntime();

        this.kernel =
            new SKOSKernel();

        this.orchestrator =
            new EngineOrchestrator();

        this.sdkc =
            new SDKCRuntimeConnector();

        this.startup =
            new StartupManager();

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



    launch() {

        if (
            this.status !== "INITIALIZED"
        ) {

            this.initialize();

        }

        this.startup.run();

        this.status = "RUNNING";

        return true;
    }



    shutdown() {

        this.startup.shutdown();

        this.status = "SHUTDOWN";

        return true;
    }



    getStatus() {

        return {

            launcher:

                this.status,

            bootstrap:

                this.bootstrap.status,

            kernel:

                this.kernel.status,

            orchestrator:

                this.orchestrator.status,

            sdkc:

                this.sdkc.status,

            startup:

                this.startup.status

        };

    }

}



module.exports =
    SKOSSystemLauncher;
