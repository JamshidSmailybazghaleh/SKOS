/**
 * ============================================================
 * SKOS Mission Control
 * Boot Sequence Compatibility Adapter
 * ------------------------------------------------------------
 * File      : boot-sequence.js
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Role      : COMPATIBILITY ADAPTER
 * ============================================================
 */

const BootSequence = {

    async start() {

        if (
            typeof SKOSKernelRuntime ===
            "undefined"
        ) {

            throw new Error(
                "SKOSKernelRuntime is not available."
            );
        }

        return await
            SKOSKernelRuntime.boot();
    },


    async stop() {

        if (
            typeof SKOSKernelRuntime ===
            "undefined"
        ) {

            return false;
        }

        return await
            SKOSKernelRuntime.shutdown();
    },


    getStatus() {

        if (
            typeof SKOSKernelRuntime ===
            "undefined"
        ) {

            return null;
        }

        return
            SKOSKernelRuntime.getStatus();
    }
};


if (typeof window !== "undefined") {

    window.BootSequence =
        BootSequence;
}

Object.freeze(BootSequence);
