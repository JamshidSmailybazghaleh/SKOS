/*
====================================================
SKOS Mission Control

Asset Index

File:
asset-index.js

Operation:
OP-002

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AssetIndex = {

    index: {},

    initialized: false,

    async initialize() {

        Logger.info(
            "Asset Index Initializing..."
        );

        this.index = {};

        this.initialized = true;

        Logger.info(
            "Asset Index Ready."
        );

        return true;

    },

    build() {

        Logger.info(
            "Building Asset Index..."
        );

        this.index = {};

        const assets =
            AssetRegistry.getAll();

        for (const asset of assets) {

            this.index[asset.id] = asset;

        }

        Logger.info(
            "Indexed : " +
            Object.keys(this.index).length +
            " Assets"
        );

        return true;

    },

    get(assetId) {

        return this.index[assetId] || null;

    },

    has(assetId) {

        return assetId in this.index;

    },

    count() {

        return Object.keys(this.index).length;

    },

    rebuild() {

        Logger.info(
            "Rebuilding Index..."
        );

        return this.build();

    },

    clear() {

        this.index = {};

        Logger.info(
            "Index Cleared."
        );

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AssetIndex);
