/*
====================================================
SKOS Mission Control

Runtime State Engine

File:
runtime-state.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const RuntimeState = {

    state: {

        system: "INITIALIZING",

        kernel: "STOPPED",

        registry: "STOPPED",

        moduleLoader: "STOPPED",

        logger: "STOPPED",

        eventBus: "STOPPED",

        commandEngine: "STOPPED"

    },

    set(engine, status) {

        if (!(engine in this.state)) {

            console.warn(
                "Unknown Engine:",
                engine
            );

            return false;

        }

        this.state[engine] = status;

        Logger.info(
            engine + " -> " + status
        );

        return true;

    },

    get(engine) {

        return this.state[engine];

    },

    getAll() {

        return {

            ...this.state

        };

    },

    isReady(engine) {

        return this.state[engine] === "READY";

    },

    reset() {

        this.state = {

            system: "INITIALIZING",

            kernel: "STOPPED",

            registry: "STOPPED",

            moduleLoader: "STOPPED",

            logger: "STOPPED",

            eventBus: "STOPPED",

            commandEngine: "STOPPED"

        };

    }

};

window.RuntimeState = RuntimeState;

Object.freeze(RuntimeState);
