/*
====================================================
SKOS Mission Control

Runtime Service

File:
runtime-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const RuntimeService = {

    async initialize() {

        Logger.info(
            "Runtime Service Initializing..."
        );

        return true;

    },

    getSystemStatus() {

        return RuntimeState.get("system");

    },

    getEngineStatus(engine) {

        return RuntimeState.get(engine);

    },

    getRuntimeState() {

        return RuntimeState.getAll();

    },

    isOperational() {

        return (

            RuntimeState.get("system") ===

            "OPERATIONAL"

        );

    },

    isReady(engine) {

        return RuntimeState.isReady(

            engine

        );

    },

    getHealthReport() {

        const runtime =

            RuntimeState.getAll();

        return {

            system: runtime.system,

            engines: runtime,

            operational:

                runtime.system ===

                "OPERATIONAL",

            timestamp:

                new Date().toISOString()

        };

    },

    refresh() {

        Logger.info(

            "Runtime Status Refreshed."

        );

        if (window.EventBus) {

            EventBus.publish(

                "runtime.changed",

                this.getHealthReport()

            );

        }

    }

};

window.RuntimeService = RuntimeService;

Object.freeze(RuntimeService);
