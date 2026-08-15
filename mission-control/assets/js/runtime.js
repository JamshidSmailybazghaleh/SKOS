/**
 * ============================================================
 * SKOS Mission Control
 * Runtime Compatibility Layer
 * ------------------------------------------------------------
 * File      : runtime.js
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Role      : COMPATIBILITY / OBSERVABILITY
 * ============================================================
 */

const Runtime = {

    getState() {

        if (
            typeof SKOSKernelRuntime ===
            "undefined"
        ) {

            return "UNKNOWN";
        }

        return
            SKOSKernelRuntime.status;
    },


    setState(state) {

        if (
            typeof RuntimeState !==
            "undefined"
        ) {

            RuntimeState.set(
                "system",
                state
            );
        }

        return true;
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
    },


    async initialize() {

        if (
            typeof SKOSKernelRuntime ===
            "undefined"
        ) {

            throw new Error(
                "SKOSKernelRuntime unavailable."
            );
        }

        return await
            SKOSKernelRuntime.initialize();
    }
};


if (typeof window !== "undefined") {

    window.Runtime =
        Runtime;
}

Object.freeze(Runtime);
