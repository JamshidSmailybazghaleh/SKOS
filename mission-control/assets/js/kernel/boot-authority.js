/**
 * ============================================================
 * SKOS Mission Control
 * Canonical Boot Authority
 * ------------------------------------------------------------
 * File      : boot-authority.js
 * Build     : BUILD-000423
 * Version   : 1.0.0
 * Role      : SINGLE BOOT AUTHORITY GATEWAY
 * ============================================================
 *
 * Contract:
 *   Browser entry and compatibility adapters MUST delegate
 *   boot ownership through this gateway.
 *
 * The primary runtime implementation remains:
 *   SKOSKernelRuntime.boot()
 *
 * This gateway owns invocation policy, not kernel execution.
 * ============================================================
 */

const BootAuthority = {

    async boot() {

        if (
            typeof SKOSKernelRuntime === "undefined"
        ) {
            throw new Error(
                "SKOSKernelRuntime is not available."
            );
        }

        return await SKOSKernelRuntime.boot();
    },

    async shutdown() {

        if (
            typeof SKOSKernelRuntime === "undefined"
        ) {
            return false;
        }

        return await SKOSKernelRuntime.shutdown();
    },

    getStatus() {

        if (
            typeof SKOSKernelRuntime === "undefined"
        ) {
            return null;
        }

        return SKOSKernelRuntime.getStatus();
    }

};

if (typeof window !== "undefined") {
    window.BootAuthority = BootAuthority;
}

Object.freeze(BootAuthority);
