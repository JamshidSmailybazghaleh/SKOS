/*
====================================================
SKOS Mission Control

Engine Lifecycle Manager

File:
engine-lifecycle.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const EngineLifecycle = {

    engines: {},

    register(name) {

        if (this.engines[name]) {

            Logger.warning(
                "Engine already registered: " + name
            );

            return false;

        }

        this.engines[name] = {

            name: name,

            status: "REGISTERED",

            startedAt: null,

            stoppedAt: null

        };

        Logger.info(
            "Engine Registered: " + name
        );

        return true;

    },

    start(name) {

        const engine = this.engines[name];

        if (!engine) {

            Logger.error(
                "Engine not registered: " + name
            );

            return false;

        }

        engine.status = "READY";

        engine.startedAt = new Date().toISOString();

        if (window.RuntimeState) {

            RuntimeState.set(name, "READY");

        }

        Logger.info(
            "Engine Started: " + name
        );

        return true;

    },

    stop(name) {

        const engine = this.engines[name];

        if (!engine) {

            return false;

        }

        engine.status = "STOPPED";

        engine.stoppedAt = new Date().toISOString();

        if (window.RuntimeState) {

            RuntimeState.set(name, "STOPPED");

        }

        Logger.info(
            "Engine Stopped: " + name
        );

        return true;

    },

    restart(name) {

        this.stop(name);

        return this.start(name);

    },

    getStatus(name) {

        if (!this.engines[name]) {

            return "UNKNOWN";

        }

        return this.engines[name].status;

    },

    list() {

        return Object.values(this.engines);

    }

};

window.EngineLifecycle = EngineLifecycle;

Object.freeze(EngineLifecycle);
