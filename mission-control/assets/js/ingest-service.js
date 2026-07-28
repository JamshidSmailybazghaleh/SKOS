/*
====================================================
SKOS Mission Control

Ingest Service

File:
ingest-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/

const IngestService = {

    async initialize() {

        Logger.info(
            "Ingest Service Initializing..."
        );

        return true;

    },

    async ingest(object) {

        Logger.info(
            "Knowledge Ingestion Started."
        );

        const valid = await this.validate(object);

        if (!valid) {

            Logger.error(
                "Knowledge Object Validation Failed."
            );

            return false;

        }

        const stored = await this.store(object);

        if (!stored) {

            Logger.error(
                "Knowledge Object Storage Failed."
            );

            return false;

        }

        await this.publish(object);

        Logger.info(
            "Knowledge Object Ready."
        );

        return true;

    },

    async validate(object) {

        if (!object) {

            return false;

        }

        if (!object.id) {

            return false;

        }

        if (!object.type) {

            return false;

        }

        if (!object.title) {

            return false;

        }

        return true;

    },

    async store(object) {

        if (

            !RepositoryService ||

            typeof RepositoryService.storeObject !==
            "function"

        ) {

            Logger.warning(
                "Repository Store Not Available."
            );

            return false;

        }

        return await RepositoryService.storeObject(
            object
        );

    },

    async publish(object) {

        if (window.EventBus) {

            EventBus.publish(
                "knowledge.ready",
                {
                    id: object.id,
                    type: object.type
                }
            );

        }

        return true;

    },

    status() {

        return "READY";

    },

    async shutdown() {

        Logger.info(
            "Ingest Service Shutdown."
        );

        return true;

    }

};

window.IngestService = IngestService;

Object.freeze(IngestService);
