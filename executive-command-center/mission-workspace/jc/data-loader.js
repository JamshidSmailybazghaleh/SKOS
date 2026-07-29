/**
 * ============================================================
 * SKOS Mission Workspace
 * Data Loader Service
 * ------------------------------------------------------------
 * File      : data-loader.js
 * Version   : 1.0.0
 * Build     : BUILD-000505
 * Purpose   : Load Mission Workspace JSON data
 * ============================================================
 */

class DataLoader {

    constructor(basePath = "./data/") {

        this.basePath = basePath;

        this.cache = {};

    }

    async initialize() {

        console.log("Mission Workspace Data Loader Initialized");

    }

    async load(fileName) {

        try {

            const response = await fetch(this.basePath + fileName);

            if (!response.ok) {

                throw new Error(fileName + " not found.");

            }

            const json = await response.json();

            this.cache[fileName] = json;

            return json;

        }

        catch (error) {

            console.error(error);

            return null;

        }

    }

    async loadAll() {

        return {

            missions:
                await this.load("missions.json"),

            tasks:
                await this.load("tasks.json"),

            milestones:
                await this.load("milestones.json"),

            operations:
                await this.load("operations.json"),

            progress:
                await this.load("progress.json"),

            history:
                await this.load("history.json")

        };

    }

    get(fileName) {

        return this.cache[fileName];

    }

    clearCache() {

        this.cache = {};

    }

    shutdown() {

        this.clearCache();

        console.log("Mission Workspace Data Loader Stopped");

    }

}
