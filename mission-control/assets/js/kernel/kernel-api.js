/**
 * ============================================================
 * SKOS Mission Control
 * Kernel API
 * ------------------------------------------------------------
 * File      : kernel-api.js
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Role      : PUBLIC RUNTIME API
 * ============================================================
 */

const KernelAPI = {

    Kernel: {

        async boot() {

            return await
                SKOSKernelRuntime.boot();
        },


        async initialize() {

            return await
                SKOSKernelRuntime.initialize();
        },


        async shutdown() {

            return await
                SKOSKernelRuntime.shutdown();
        },


        getStatus() {

            return SKOSKernelRuntime.getStatus();
        },


        healthCheck() {

            return SKOSKernelRuntime.healthCheck();
        }
    },


    Registry: {

        async Load() {

            return await
                SKOSKernelRuntime.loadRegistry();
        }
    },


    Module: {

        async Load(name) {

            if (
                typeof ModuleLoader === "undefined"
            ) {

                throw new Error(
                    "ModuleLoader is not available."
                );
            }

            return await
                ModuleLoader.loadModule(name);
        },


        async LoadAll() {

            return await
                SKOSKernelRuntime.loadModules();
        }
    },


    Runtime: {

        getStatus() {

            return SKOSKernelRuntime.getStatus();
        },


        async boot() {

            return await
                SKOSKernelRuntime.boot();
        },


        async shutdown() {

            return await
                SKOSKernelRuntime.shutdown();
        }
    }
};


if (typeof window !== "undefined") {

    window.KernelAPI =
        KernelAPI;
}

Object.freeze(KernelAPI);
