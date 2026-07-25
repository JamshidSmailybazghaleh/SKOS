/*
====================================================
SKOS Mission Control

Module Manager

File:
module-manager.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const ModuleManager = {

    modules: new Map(),

    register(name, object) {

        this.modules.set(name, object);

        Logger.info(
            "Registered : " + name
        );

    },

    get(name) {

        return this.modules.get(name);

    },

    async initialize(name) {

        const module = this.get(name);

        if (!module) {

            Logger.error(
                "Module not found : " + name
            );

            Runtime.incrementErrors();

            return;

        }

        if (typeof module.initialize === "function") {

            await module.initialize();

        }

    },

    destroy(name) {

        const module = this.get(name);

        if (

            module &&

            typeof module.destroy === "function"

        ) {

            module.destroy();

        }

    }

};

window.ModuleManager = ModuleManager;

Object.freeze(ModuleManager);
