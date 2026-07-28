/*
====================================================
SKOS Mission Control

Build Service

File:
build-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const BuildService = {

    builds: [],

    async initialize() {

        Logger.info(
            "Build Service Initializing..."
        );

        return true;

    },

    async loadBuildIndex() {

        try {

            const response = await fetch(

                CONFIG.paths.data +

                "build-index.json"

            );

            if (!response.ok) {

                throw new Error(
                    "build-index.json not found."
                );

            }

            this.builds =
                await response.json();

            Logger.info(
                "Build Index Loaded."
            );

            if (window.EventBus) {

                EventBus.publish(

                    "build.index.loaded",

                    this.builds

                );

            }

            return true;

        }

        catch (error) {

            Logger.error(
                error.message
            );

            return false;

        }

    },

    getLatestBuild() {

        if (this.builds.length === 0) {

            return null;

        }

        return this.builds[0];

    },

    getBuild(buildId) {

        return this.builds.find(

            build =>

            build.id === buildId

        );

    },

    listBuilds() {

        return this.builds;

    },

    getCurrentSprint() {

        const latest =
            this.getLatestBuild();

        if (!latest) {

            return "";

        }

        return latest.sprint;

    },

    clear() {

        this.builds = [];

    }

};

window.BuildService = BuildService;

Object.freeze(BuildService);
