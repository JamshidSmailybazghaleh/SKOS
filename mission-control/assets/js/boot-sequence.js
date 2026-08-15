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

        Logger.info(
            "BootSequence delegated to Primary Kernel."
        );

        RuntimeState.set(
            "system",
            "INITIALIZING"
        );

        try {

            await SKOSKernelRuntime.boot();

            RuntimeState.set(
                "system",
                "OPERATIONAL"
            );

            return true;

        } catch (error) {

            RuntimeState.set(
                "system",
                "FAILED"
            );

            Logger.error(
                error.message
            );

            return false;
        }
    }
};


window.BootSequence = BootSequence;

Object.freeze(BootSequence);
