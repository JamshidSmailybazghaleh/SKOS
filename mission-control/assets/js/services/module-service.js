/*
====================================================
SKOS Mission Control

Module Service

File:
module-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const ModuleService = {

    modules: [],

    async initialize() {

        Logger.info(
            "Module Service Initializing..."
        );

        return true;

    },

    async loadModule(moduleName) {

        Logger.info(
            "Loading Module: " +
            moduleName
        );

        try {

            const loaded = await KernelAPI.Module.Load(
                moduleName
            );

            if (loaded) {

                if (!this.modules.includes(moduleName)) {

                    this.modules.push(moduleName);

                }

                if (window.EventBus) {

                    EventBus.publish(
                        "module.loaded",
                        {
                            name: moduleName
                        }
                    );

                }

            }

            return loaded;

        }

        catch (error) {

            Logger.error(
                error.message
            );

            if (window.EventBus) {

                EventBus.publish(
                    "module.failed",
                    {
                        name: moduleName,
                        error: error.message
                    }
                );

            }

            return false;

        }

    },

    async reloadModule(moduleName) {

        Logger.info(
            "Reloading Module: " +
            moduleName
        );

        await this.unloadModule(
            moduleName
        );

        return await this.loadModule(
            moduleName
        );

    },

    async unloadModule(moduleName) {

        this.modules =
            this.modules.filter(

                item =>

                item !== moduleName

            );

        Logger.info(
            "Module Unloaded: " +
            moduleName
        );

        if (window.EventBus) {

            EventBus.publish(
                "module.unloaded",
                {
                    name: moduleName
                }
            );

        }

        return true;

    },

    isLoaded(moduleName) {

        return this.modules.includes(
            moduleName
        );

    },

    listModules() {

        return [...this.modules];

    },

    clear() {

        this.modules = [];

    }

};

window.ModuleService = ModuleService;

Object.freeze(ModuleService);
