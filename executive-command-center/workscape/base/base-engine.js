/*
==========================================================
SKOS Framework
Base Engine
Version : 1.0.0
BUILD : BUILD-000022
==========================================================
*/

class BaseEngine {

    constructor(name = "Base Engine") {

        this.name = name;

        this.version = "1.0.0";

        this.status = "idle";

        this.initialized = false;

        this.running = false;

        this.context = {};

    }


    async initialize(context = {}) {

        this.context = context;

        this.initialized = true;

        this.status = "initialized";

        console.info(

            "[" + this.name + "] Initialized"

        );

    }


    isReady() {

        return this.initialized;

    }


    async execute(payload = {}) {

        if (!this.initialized) {

            throw new Error(

                this.name +

                " is not initialized."

            );

        }

        this.running = true;

        this.status = "running";

        console.info(

            "[" + this.name + "] Execute",

            payload

        );

    }


    async pause() {

        this.status = "paused";

        this.running = false;

    }


    async resume() {

        this.status = "running";

        this.running = true;

    }


    async stop() {

        this.status = "stopped";

        this.running = false;

    }


    async synchronize() {

        console.info(

            "[" + this.name + "] Synchronize"

        );

    }


    async refresh() {

        console.info(

            "[" + this.name + "] Refresh"

        );

    }


    async shutdown() {

        this.context = {};

        this.running = false;

        this.initialized = false;

        this.status = "shutdown";

        console.info(

            "[" + this.name + "] Shutdown"

        );

    }

}

export default BaseEngine;
