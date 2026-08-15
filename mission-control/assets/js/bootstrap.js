/**
 * ============================================================
 * SKOS Mission Control
 * Browser Bootstrap
 * ------------------------------------------------------------
 * File      : bootstrap.js
 * Operation : OP-020
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Role      : BROWSER ENTRY POINT
 * ============================================================
 */

const Bootstrap = {

    started: false,

    async initialize() {

        if (this.started) {
            return SKOSKernelRuntime.getStatus();
        }

        this.started = true;

        console.log(
            "=========================================="
        );

        console.log(
            "SKOS MISSION CONTROL"
        );

        console.log(
            "PRIMARY RUNTIME BOOT"
        );

        console.log(
            "=========================================="
        );

        try {

            if (
                typeof CONFIG === "undefined"
            ) {
                throw new Error(
                    "CONFIG not loaded."
                );
            }

            if (
                typeof SKOSKernelRuntime === "undefined"
            ) {
                throw new Error(
                    "Primary SKOS Kernel not loaded."
                );
            }

            const status =
                await SKOSKernelRuntime.boot();

            console.log(
                "SKOS READY",
                status
            );

            return status;

        } catch (error) {

            this.started = false;

            console.error(
                "SKOS BOOT FAILED:",
                error
            );

            throw error;
        }
    }
};


window.addEventListener(
    "DOMContentLoaded",
    async () => {

        try {

            await Bootstrap.initialize();

        } catch (error) {

            console.error(
                "Fatal Bootstrap Error:",
                error
            );
        }
    }
);


Object.freeze(Bootstrap);
