/**
 * ============================================================
 * SKOS Mission Control
 * Legacy Kernel Compatibility Facade
 * ------------------------------------------------------------
 * File      : kernel.js
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Authority : SKOSKernelRuntime
 *
 * IMPORTANT:
 * This file MUST NOT create or own a runtime.
 * ============================================================
 */

const SKOS = {

    get version() {
        return SKOSKernelRuntime.version;
    },

    get initialized() {
        return SKOSKernelRuntime.initialized;
    },

    get modules() {
        return Array.from(
            SKOSKernelRuntime.modules.keys()
        );
    },


    async initialize() {
        return await SKOSKernelRuntime.boot();
    },


    async start() {
        return await SKOSKernelRuntime.boot();
    },


    async loadRegistry() {
        return await SKOSKernelRuntime.loadRegistry();
    },


    async loadModules() {
        return await SKOSKernelRuntime.initializeModules();
    },


    async loadStatus() {

        return SKOSKernelRuntime.getStatus();
    },


    renderDashboard() {

        console.log(
            "Rendering Dashboard..."
        );

        if (
            typeof DashboardService !== "undefined" &&
            typeof DashboardService.getDashboard === "function"
        ) {

            return DashboardService.getDashboard();
        }

        return true;
    },


    getLoadedModules() {

        return Array.from(
            SKOSKernelRuntime.modules.keys()
        );
    },


    isInitialized() {

        return SKOSKernelRuntime.initialized;
    },


    getStatus() {

        return SKOSKernelRuntime.getStatus();
    },


    shutdown() {

        return SKOSKernelRuntime.shutdown();
    }
};


window.SKOS = SKOS;

Object.freeze(SKOS);
