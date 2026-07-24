/*
====================================================
SKOS Mission Control

Kernel

File:
kernel.js

Version:
1.1

Status:
ACTIVE
====================================================
*/

const SKOS = {

    version: CONFIG.system.version,

    initialized: false,

    modules: [],



    async initialize() {

        console.log("================================");
        console.log(CONFIG.system.name);
        console.log("Kernel Initializing...");
        console.log("================================");

        await this.loadRegistry();

        await this.loadModules();

        await this.loadStatus();

        this.renderDashboard();

        this.initialized = true;

        console.log("================================");
        console.log("Kernel Ready");
        console.log("Version:", this.version);
        console.log("================================");

    },



    async loadRegistry() {

    console.log("Loading Registry...");

    const loaded = await Registry.load();

    if (!loaded) {

        console.error(

            "Registry could not be loaded."

        );

    }

},



    async loadModules() {

        console.log("Loading Modules...");

        const loaded = await ModuleLoader.load(

            "executive-summary",

            CONFIG.dashboard.containerId

        );

        if (loaded) {

            this.modules.push("executive-summary");

        }

    },



    async loadStatus() {

        console.log("Loading Status...");

        try {

            const response = await fetch(

                CONFIG.paths.data +
                CONFIG.files.status

            );

            if (!response.ok) {

                throw new Error("STATUS.json not found");

            }

            const status = await response.json();

            console.log(

                "Latest Build:",
                status.latestBuild

            );

        }

        catch (error) {

            console.warn(

                "Status loading skipped."

            );

        }

    },



    renderDashboard() {

        console.log(

            "Rendering Dashboard..."

        );

    },



    getLoadedModules() {

        return this.modules;

    },



    isInitialized() {

        return this.initialized;

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
