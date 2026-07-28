/*
====================================================
SKOS Mission Control

Digital Library Engine

BUILD-000371

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

const DigitalLibraryEngine = {

    async initialize() {

        Logger.info(
            "Digital Library Engine Initializing..."
        );

        return true;

    },

    async publish(object) {

        if (!object) {

            throw new Error(
                "Knowledge Object Required."
            );

        }

        const record = this.createRecord(object);

        await this.index(record);

        await this.updateStatistics(record);

        Logger.info(
            "Library Updated: " + record.id
        );

        return record;

    },

    createRecord(object) {

        return {

            id: object.id,

            title: object.title,

            author: object.metadata.author,

            category: object.metadata.category,

            tags: object.metadata.tags || [],

            version: object.version,

            publishedAt:
                new Date().toISOString()

        };

    },

    async index(record) {

        return LibraryIndex.add(record);

    },

    async search(query) {

        return LibraryIndex.search(query);

    },

    async getById(id) {

        return LibraryIndex.get(id);

    },

    async updateStatistics(record) {

        return LibraryStatistics.increment(

            "publishedObjects"

        );

    },

    async list(category = null) {

        return LibraryIndex.list(category);

    },

    status() {

        return "READY";

    }

};

window.DigitalLibraryEngine =
    DigitalLibraryEngine;

Object.freeze(
    DigitalLibraryEngine
);
