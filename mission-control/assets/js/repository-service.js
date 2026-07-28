/*
====================================================
SKOS Mission Control

Repository Service

File:
repository-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const RepositoryService = {

    async initialize() {

        Logger.info(
            "Repository Service Initializing..."
        );

        return await RepositoryEngine.initialize();

    },

    async getObject(id) {

        return await RepositoryEngine.loadObject(id);

    },

    exists(id) {

        return RepositoryEngine.exists(id);

    },

    getStatistics() {

        return RepositoryEngine.statistics();

    },

    getManifest() {

        return RepositoryEngine.getManifest();

    },

    async shutdown() {

        return await RepositoryEngine.shutdown();

    },

    status() {

        return RepositoryEngine.isOpen()

            ? "READY"

            : "OFFLINE";

    }

};

window.RepositoryService = RepositoryService;

Object.freeze(RepositoryService);
