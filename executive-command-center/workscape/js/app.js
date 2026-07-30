/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : app.js
   Version   : 1.0.0
   Build     : BUILD-000510
   Purpose   : Application Bootstrap
=========================================================== */

"use strict";

/* ===========================================================
   Application
=========================================================== */

class WorkScapeApplication {

    constructor() {

        this.version = "1.0.0";

        this.build = "BUILD-000510";

        this.initialized = false;

    }

    async initialize() {

        console.log("====================================");
        console.log("SKOS WorkScape");
        console.log(this.version);
        console.log(this.build);
        console.log("====================================");

        await this.loadModules();

        await this.loadWorkspace();

        this.bindEvents();

        this.initialized = true;

        console.log("WorkScape Ready.");

    }

    async loadModules() {

        console.log("Loading modules...");

    }

    async loadWorkspace() {

        console.log("Loading workspace...");

    }

    bindEvents() {

        console.log("Binding events...");

    }

    shutdown() {

        console.log("WorkScape shutdown.");

    }

}

/* ===========================================================
   Bootstrap
=========================================================== */

window.addEventListener("DOMContentLoaded", async () => {

    const app = new WorkScapeApplication();

    window.WorkScape = app;

    await app.initialize();

});
