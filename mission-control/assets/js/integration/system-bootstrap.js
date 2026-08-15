/**
 * ============================================================
 * SKOS - System Bootstrap Adapter
 * ------------------------------------------------------------
 * File      : system-bootstrap.js
 * Operation : OP-021
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Status    : ACTIVE
 * Role      : ORCHESTRATION ADAPTER
 *
 * IMPORTANT:
 *   This component NEVER boots an independent kernel.
 *   It delegates all runtime authority to SKOSKernelRuntime.
 * ============================================================
 */

class SystemBootstrap {

    constructor(config = {}) {

        this.name = "SystemBootstrap";
        this.version = "2.0.0";
        this.build = "BUILD-000423";

        this.config = config;

        this.initialized = false;
        this.running = false;
        this.bootState = "IDLE";
    }


    async initialize() {

        if (this.initialized) {
            return true;
        }

        this.initialized = true;

        this.bootState = "INITIALIZED";

        return true;
    }


    async execute() {

        await this.initialize();

        this.bootState = "DELEGATED";

        if (
            typeof SKOSKernelRuntime === "undefined"
        ) {

            throw new Error(
                "SKOSKernelRuntime is not available."
            );
        }

        const result =
            await SKOSKernelRuntime.boot();

        this.running = true;

        this.bootState = "READY";

        return result;
    }


    healthCheck() {

        return {

            name:
                this.name,

            version:
                this.version,

            build:
                this.build,

            role:
                "ORCHESTRATION_ADAPTER",

            kernel:
                typeof SKOSKernelRuntime !==
                "undefined"
                    ? SKOSKernelRuntime.getStatus()
                    : null,

            initialized:
                this.initialized,

            running:
                this.running,

            bootState:
                this.bootState
        };
    }


    async shutdown() {

        if (
            typeof SKOSKernelRuntime !==
            "undefined"
        ) {

            await SKOSKernelRuntime.shutdown();
        }

        this.running = false;

        this.bootState = "STOPPED";

        return true;
    }
}


if (typeof module !== "undefined") {

    module.exports =
        SystemBootstrap;
}


if (typeof window !== "undefined") {

    window.SystemBootstrap =
        SystemBootstrap;
}
