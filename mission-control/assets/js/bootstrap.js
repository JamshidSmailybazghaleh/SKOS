/**
 * ============================================================
 * SKOS Mission Control
 * Browser Bootstrap
 * ------------------------------------------------------------
 * File      : bootstrap.js
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Role      : SINGLE BROWSER ENTRY POINT
 * ============================================================
 */

const Bootstrap = {

    initialized: false,


    async initialize() {

        if (this.initialized) {

            return true;
        }

        try {

            if (
                typeof CONFIG === "undefined"
            ) {

                throw new Error(
                    "CONFIG not loaded."
                );
            }


            if (
                typeof SKOSKernelRuntime ===
                "undefined"
            ) {

                throw new Error(
                    "Primary SKOSKernelRuntime not loaded."
                );
            }


            if (
                typeof Logger !== "undefined" &&
                Logger.info
            ) {

                Logger.info(
                    "SKOS Bootstrap Starting..."
                );
            }


            /*
             * SINGLE AUTHORITATIVE BOOT
             */

            await
                SKOSKernelRuntime.boot();


            this.initialized = true;


            if (
                typeof Logger !== "undefined" &&
                Logger.info
            ) {

                Logger.info(
                    "SKOS Bootstrap Completed."
                );
            }


            return true;

        }
        catch (error) {

            if (
                typeof Logger !== "undefined" &&
                Logger.error
            ) {

                Logger.error(
                    "SKOS Bootstrap Failed:",
                    error
                );
            }

            console.error(
                "SKOS Bootstrap Failed:",
                error
            );

            return false;
        }
    }
};


window.addEventListener(
    "DOMContentLoaded",
    async () => {

        await Bootstrap.initialize();

    }
);


if (typeof window !== "undefined") {

    window.Bootstrap =
        Bootstrap;
}

Object.freeze(Bootstrap);
