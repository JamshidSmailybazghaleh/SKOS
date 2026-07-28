/*
====================================================
SKOS Mission Control

Engine Manager

File:
engine-manager.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const EngineManager = {

    engines: {},

    register(name, engine) {

        if (this.engines[name]) {

            Logger.warning(
                "Engine already registered: " +
                name
            );

            return false;

        }

        this.engines[name] = engine;

        Logger.info(
            "Engine Registered: " +
            name
        );

        return true;

    },

    async initializeAll() {

        Logger.info(
            "Initializing Engines..."
        );

        for (const name of Object.keys(this.engines)) {

            const engine = this.engines[name];

            if (
                engine &&
                typeof engine.initialize ===
                "function"
            ) {

                await engine.initialize();

            }

        }

        Logger.info(
            "All Engines Ready."
        );

        return true;

    },

    async restart(name) {

        const engine = this.engines[name];

        if (!engine) {

            Logger.error(
                "Engine not found: " +
                name
            );

            return false;

        }

        if (
            typeof engine.shutdown ===
            "function"
        ) {

            await engine.shutdown();

        }

        if (
            typeof engine.initialize ===
            "function"
        ) {

            await engine.initialize();

        }

        Logger.info(
            "Engine Restarted: " +
            name
        );

        return true;

    },

    async shutdown(name) {

        const engine = this.engines[name];

        if (!engine) {

            return false;

        }

        if (
            typeof engine.shutdown ===
            "function"
        ) {

            await engine.shutdown();

        }

        Logger.info(
            "Engine Shutdown: " +
            name
        );

        return true;

    },

    get(name) {

        return this.engines[name] || null;

    },

    list() {

        return Object.keys(this.engines);

    }

};

window.EngineManager = EngineManager;

Object.freeze(EngineManager);
