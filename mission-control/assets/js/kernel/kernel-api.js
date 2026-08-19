/*
====================================================
SKOS Mission Control
Kernel API
File: kernel/kernel-api.js
Version: 1.1
Status: ACTIVE
====================================================
*/

const KernelAPI = {

    Registry: {

        async Load() {
            return await Registry.load();
        },

        async GetModules() {
            return await Registry.getModules();
        },

        async GetModule(moduleName) {
            return await Registry.getModule(moduleName);
        },

        GetStatus() {
            return Registry.getStatus();
        },

        GetVersion() {
            return Registry.getVersion();
        },

        async Reload() {
            return await Registry.reload();
        }
    },

    Module: {

        async Load(moduleName) {
            return await ModuleLoader.loadModule(moduleName);
        },

        async Reload(moduleName) {
            return await ModuleLoader.loadModule(moduleName);
        },

        IsLoaded(moduleName) {
            return ModuleLoader.isLoaded(moduleName);
        },

        List() {
            return ModuleLoader.list();
        },

        Clear() {
            return ModuleLoader.clear();
        }
    }
};

window.KernelAPI = KernelAPI;
Object.freeze(KernelAPI);
