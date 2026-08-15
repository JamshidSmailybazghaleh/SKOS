/**
 * ============================================================
 * SKOS Mission Control
 * Kernel Compatibility Facade
 * ------------------------------------------------------------
 * File      : kernel.js
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Role      : COMPATIBILITY FACADE
 *
 * This file is NOT the primary kernel.
 * All operations delegate to SKOSKernelRuntime.
 * ============================================================
 */

const SKOS = {

    get version() {

        return (
            typeof SKOSKernelRuntime !== "undefined"
                ? SKOSKernelRuntime.version
                : "UNKNOWN"
        );
    },


    get build() {

        return (
            typeof SKOSKernelRuntime !== "undefined"
                ? SKOSKernelRuntime.build
                : "UNKNOWN"
        );
    },


    async initialize() {

        return await
            SKOSKernelRuntime.boot();
    },


    async start() {

        return await
            SKOSKernelRuntime.boot();
    },


    async loadRegistry() {

        return await
            SKOSKernelRuntime.loadRegistry();
    },


    async loadModules() {

        return await
            SKOSKernelRuntime.loadModules();
    },


    async loadStatus() {

        return await
            SKOSKernelRuntime.loadStatus();
    },


    renderDashboard() {

        if (
            typeof DashboardService !== "undefined" &&
            typeof DashboardService.render === "function"
        ) {

            return DashboardService.render();
        }

        return true;
    },


    getLoadedModules() {

        return [
            ...SKOSKernelRuntime.modules
        ];
    },


    getStatus() {

        return SKOSKernelRuntime.getStatus();
    },


    isInitialized() {

        return SKOSKernelRuntime.initialized;
    },


    isRunning() {

        return SKOSKernelRuntime.running;
    },


    async shutdown() {

        return await
            SKOSKernelRuntime.shutdown();
    }
};


if (typeof window !== "undefined") {

    window.SKOS = SKOS;
}

Object.freeze(SKOS);
