/*
====================================================
SKOS Mission Control

Asset History

File:
asset-history.js

Operation:
OP-002

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AssetHistory = {

    history: [],

    async initialize() {

        Logger.info(
            "Asset History Initializing..."
        );

        this.history = [];

        return true;

    },

    add(assetId, action, details = "") {

        const record = {

            timestamp: new Date().toISOString(),

            assetId: assetId,

            action: action,

            details: details

        };

        this.history.push(record);

        Logger.info(
            "History Added : " +
            assetId +
            " -> " +
            action
        );

        return true;

    },

    get(assetId) {

        return this.history.filter(

            record => record.assetId === assetId

        );

    },

    getAll() {

        return this.history;

    },

    clear() {

        this.history = [];

        Logger.info(
            "History Cleared."
        );

    },

    count() {

        return this.history.length;

    }

};

Object.freeze(AssetHistory);
