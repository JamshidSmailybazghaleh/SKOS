/*
==========================================================
SKOS Executive Command Center
Data Loader Service
Version : 1.0.0
BUILD : BUILD-000001
==========================================================
*/

class DataLoader {

    constructor() {

        this.cache = new Map();

        this.basePath = "./data/";

    }

    async initialize() {

        console.info("[DataLoader] Initialized");

        return true;

    }

    async load(fileName) {

        if (this.cache.has(fileName)) {

            return this.cache.get(fileName);

        }

        try {

            const response = await fetch(

                this.basePath + fileName

            );

            if (!response.ok) {

                throw new Error(

                    "Unable to load " + fileName

                );

            }

            const data = await response.json();

            this.cache.set(

                fileName,

                data

            );

            return data;

        }

        catch (error) {

            console.error(

                "[DataLoader]",

                error

            );

            return null;

        }

    }

    async loadWorkspace() {

        return await this.load(

            "workspace.json"

        );

    }

    async loadDashboard() {

        return await this.load(

            "dashboard.json"

        );

    }

    async loadMissions() {

        return await this.load(

            "missions.json"

        );

    }

    async loadTasks() {

        return await this.load(

            "tasks.json"

        );

    }

    async loadOperations() {

        return await this.load(

            "operations.json"

        );

    }

    async loadAnalytics() {

        return await this.load(

            "analytics.json"

        );

    }

    clearCache() {

        this.cache.clear();

    }

    remove(fileName) {

        this.cache.delete(

            fileName

        );

    }

    shutdown() {

        this.clearCache();

        console.info(

            "[DataLoader] Shutdown"

        );

    }

}

const dataLoader = new DataLoader();

export default dataLoader;
