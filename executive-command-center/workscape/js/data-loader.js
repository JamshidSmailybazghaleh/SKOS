/* ===========================================================
   SKOS Executive Command Center
   -----------------------------------------------------------
   Module    : WorkScape
   File      : data-loader.js
   Version   : 1.0.0
   Build     : BUILD-000512
   Purpose   : Data Loading Service
=========================================================== */

"use strict";

class DataLoader {

    constructor() {

        this.basePath = "./data/";

    }

    async load(fileName) {

        try {

            const response = await fetch(this.basePath + fileName);

            if (!response.ok) {

                throw new Error(
                    "Unable to load " + fileName
                );

            }

            return await response.json();

        }

        catch(error){

            console.error(error);

            return null;

        }

    }

    async loadWorkspace() {

        return await this.load("workspace.json");

    }

    async loadWidgets() {

        return await this.load("widgets.json");

    }

    async loadOperations() {

        return await this.load("operations.json");

    }

    async loadTasks() {

        return await this.load("tasks.json");

    }

    async loadProgress() {

        return await this.load("progress.json");

    }

    async loadHistory() {

        return await this.load("history.json");

    }

}

window.DataLoader = DataLoader;
