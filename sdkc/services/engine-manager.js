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

    engines: new Map(),

    async initialize() {

        Logger.info(
            "Engine Manager Initializing..."
        );

        return true;
    },

    register(name, engine) {

        if (!name || !engine) {

            Logger.error(
                "Invalid Engine Registration."
            );

            return false;
        }

        this.engines.set(name, {

            instance: engine,

            status: "REGISTERED",

            startedAt: null

        });

        Logger.info(
            "Engine Registered: " + name
        );

        return true;
    },

    async start(name) {

        const engine = this.engines.get(name);

        if (!engine) {

            Logger.error(
                "Engine Not Found: " + name
            );

            return false;
        }

        if (typeof engine.instance.initialize === "function") {

            await engine.instance.initialize();

        }

        engine.status = "RUNNING";

        engine.startedAt =
            new Date().toISOString();

        Logger.info(
            "Engine Started: " + name
        );

        return true;
    },

    stop(name) {

        const engine = this.engines.get(name);

        if (!engine) {

            return false;

        }

        if (typeof engine.instance.shutdown === "function") {

            engine.instance.shutdown();

        }

        engine.status = "STOPPED";

        Logger.info(
            "Engine Stopped: " + name
        );

        return true;
    },

    async restart(name) {

        this.stop(name);

        return await this.start(name);
    },

    get(name) {

        return this.engines.get(name);

    },

    getStatus(name) {

        const engine = this.engines.get(name);

        if (!engine) {

            return "UNKNOWN";

        }

        return engine.status;
    },

    list() {

        return Array.from(this.engines.entries()).map(

            ([name, engine]) => ({

                name,

                status: engine.status,

                startedAt: engine.startedAt

            })

        );

    },

    statistics() {

        const stats = {

            total: this.engines.size,

            running: 0,

            stopped: 0,

            registered: 0

        };

        this.engines.forEach(engine => {

            switch (engine.status) {

                case "RUNNING":
                    stats.running++;
                    break;

                case "STOPPED":
                    stats.stopped++;
                    break;

                case "REGISTERED":
                    stats.registered++;
                    break;

            }

        });

        return stats;
    },

    status() {

        return "READY";

    }

};

window.EngineManager = EngineManager;

Object.freeze(EngineManager);
