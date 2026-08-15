/**
 * ============================================================
 * SKOS Mission Control
 * Kernel API
 * ------------------------------------------------------------
 * File      : kernel-api.js
 * Operation : OP-020
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Role      : RUNTIME FACADE
 * Authority : SKOSKernelRuntime
 * ============================================================
 */

const KernelAPI = {

    get Kernel() {

        if (
            typeof SKOSKernelRuntime === "undefined"
        ) {
            throw new Error(
                "SKOSKernelRuntime is not available."
            );
        }

        return SKOSKernelRuntime;
    },


    System: {

        async Initialize() {
            return await KernelAPI.Kernel.initialize();
        },

        async Boot() {
            return await KernelAPI.Kernel.boot();
        },

        async Shutdown() {
            return await KernelAPI.Kernel.shutdown();
        },

        Status() {
            return KernelAPI.Kernel.getStatus();
        },

        Health() {
            return KernelAPI.Kernel.healthCheck();
        },

        Diagnostics() {
            return KernelAPI.Kernel.runDiagnostics();
        }
    },


    Registry: {

        async Load() {

            if (
                typeof Registry === "undefined"
            ) {
                throw new Error(
                    "Registry is not available."
                );
            }

            return await Registry.load();
        },

        async Modules() {

            if (
                typeof Registry === "undefined"
            ) {
                return [];
            }

            return await Registry.getModules();
        }
    },


    Module: {

        async Load(moduleName) {

            if (!moduleName) {
                throw new Error(
                    "Module name is required."
                );
            }

            if (
                typeof ModuleLoader === "undefined"
            ) {
                throw new Error(
                    "ModuleLoader is not available."
                );
            }

            const loaded =
                await ModuleLoader.loadModule(
                    moduleName
                );

            if (loaded) {

                KernelAPI.Kernel.registerModule(
                    moduleName,
                    {
                        name: moduleName
                    }
                );
            }

            return loaded;
        },

        Get(moduleName) {
            return KernelAPI.Kernel.getModule(
                moduleName
            );
        },

        List() {
            return Array.from(
                KernelAPI.Kernel.modules.keys()
            );
        }
    },


    Service: {

        Register(name, service) {

            return KernelAPI.Kernel.registerService(
                name,
                service
            );
        },

        Get(name) {

            return KernelAPI.Kernel.getService(
                name
            );
        },

        List() {

            return Array.from(
                KernelAPI.Kernel.services.keys()
            );
        }
    },


    Engine: {

        Register(name, engine) {

            return KernelAPI.Kernel.registerEngine(
                name,
                engine
            );
        },

        Get(name) {

            return KernelAPI.Kernel.getEngine(
                name
            );
        },

        List() {

            return Array.from(
                KernelAPI.Kernel.engines.keys()
            );
        },

        async Execute(name, payload = {}) {

            return await KernelAPI.Kernel.executeEngine(
                name,
                payload
            );
        }
    },


    Runtime: {

        Status() {
            return KernelAPI.Kernel.getStatus();
        },

        Diagnostics() {
            return KernelAPI.Kernel.runDiagnostics();
        },

        Events() {
            return KernelAPI.Kernel.getEvents();
        }
    }
};


window.KernelAPI = KernelAPI;

Object.freeze(KernelAPI);
