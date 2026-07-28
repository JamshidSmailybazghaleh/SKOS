/*
====================================================
SKOS Mission Control

SDKC Repository Engine

File:
repository-engine.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const RepositoryEngine = {

    manifest: null,

    index: null,

    opened: false,

    async initialize() {

        Logger.info(
            "Repository Engine Initializing..."
        );

        return await this.open();

    },

    async open() {

        try {

            const response = await fetch(

                "sdkc/manifests/repository.manifest.json"

            );

            if (!response.ok) {

                throw new Error(
                    "Repository Manifest Not Found."
                );

            }

            this.manifest =

                await response.json();

            this.opened = true;

            Logger.info(
                "Repository Opened."
            );

            if (window.EventBus) {

                EventBus.publish(
                    "repository.opened",
                    {}
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

    async loadIndex() {

        try {

            const response = await fetch(

                "sdkc/indexes/sdkc-index.json"

            );

            if (!response.ok) {

                throw new Error(
                    "SDKC Index Not Found."
                );

            }

            this.index =

                await response.json();

            Logger.info(
                "SDKC Index Loaded."
            );

            if (window.EventBus) {

                EventBus.publish(
                    "repository.index.loaded",
                    {}
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

    async loadObject(id) {

        if (!this.index) {

            const ok =

                await this.loadIndex();

            if (!ok) {

                return null;

            }

        }

        const item =

            this.index.objects.find(

                object =>

                object.id === id

            );

        if (!item) {

            if (window.EventBus) {

                EventBus.publish(

                    "repository.object.notfound",

                    { id }

                );

            }

            return null;

        }

        try {

            const response = await fetch(

                "sdkc/" + item.path

            );

            if (!response.ok) {

                throw new Error(

                    "Knowledge Object Missing."

                );

            }

            const object =

                await response.json();

            if (window.EventBus) {

                EventBus.publish(

                    "repository.object.loaded",

                    {

                        id

                    }

                );

            }

            return object;

        }

        catch (error) {

            Logger.error(

                error.message

            );

            return null;

        }

    },

    exists(id) {

        if (!this.index) {

            return false;

        }

        return this.index.objects.some(

            object =>

            object.id === id

        );

    },

    statistics() {

        if (!this.index) {

            return null;

        }

        return this.index.statistics;

    },

    getManifest() {

        return this.manifest;

    },

    isOpen() {

        return this.opened;

    },

    async shutdown() {

        this.manifest = null;

        this.index = null;

        this.opened = false;

        Logger.info(
            "Repository Closed."
        );

        return true;

    }

};

window.RepositoryEngine = RepositoryEngine;

Object.freeze(
    RepositoryEngine
);
