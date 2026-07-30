/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : workspace-controller.js
   Version   : 1.0.0
   Build     : BUILD-000511
   Purpose   : Workspace Controller
=========================================================== */

"use strict";

class WorkSpaceController {

    constructor() {

        this.initialized = false;

        this.modules = {};

        this.state = {};

    }

    async initialize() {

        console.log("[Workspace] Initialize");

        await this.loadConfiguration();

        await this.initializeModules();

        await this.loadWorkspaceData();

        this.initialized = true;

    }

    async loadConfiguration() {

        console.log("[Workspace] Configuration Loaded");

    }

    async initializeModules() {

        console.log("[Workspace] Modules Initialized");

    }

    async loadWorkspaceData() {

        console.log("[Workspace] Workspace Data Loaded");

    }

    registerModule(name, module) {

        this.modules[name] = module;

    }

    getModule(name) {

        return this.modules[name];

    }

    setState(key, value) {

        this.state[key] = value;

    }

    getState(key) {

        return this.state[key];

    }

    refresh() {

        console.log("[Workspace] Refresh");

    }

    shutdown() {

        console.log("[Workspace] Shutdown");

    }

}

window.WorkSpaceController = WorkSpaceController;
