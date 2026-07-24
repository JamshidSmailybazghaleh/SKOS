/*
====================================================
SKOS Mission Control Kernel
File: kernel.js
Version: 1.0
Status: ACTIVE
====================================================
*/

const SKOS = {

    version: "Alpha 0.2",

    initialized: false,

    modules: [],

    async initialize() {

        console.log("================================");
        console.log("SKOS Mission Control Kernel");
        console.log("Initializing...");
        console.log("================================");

        await this.loadRegistry();

        await this.loadModules();

        await this.loadStatus();

        this.renderDashboard();

        this.initialized = true;

        console.log("Kernel Ready.");

    },

    async loadRegistry() {

        console.log("Loading Registry...");

        /*
        Future:

        registry.json

        */

    },

    async loadModules() {

        console.log("Loading Modules...");

        /*
        Future:

        MODULE-001

        MODULE-002

        ...

        */

    },

    async loadStatus() {

        console.log("Loading Status...");

        /*
        Future:

        STATUS.json

        */

    },

    renderDashboard() {

        console.log("Rendering Dashboard...");

    },

    start() {

        this.initialize();

    }

};


window.addEventListener(

    "DOMContentLoaded",

    () => {

        SKOS.start();

    }

);
