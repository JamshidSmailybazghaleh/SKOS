/*
====================================================
SKOS Mission Control

Asset Registry

File:
asset-registry.js

Operation:
OP-002

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AssetRegistry = {

    version: "1.0",

    initialized: false,

    assets: [],

    async initialize() {

        Logger.info(
            "Asset Registry Initializing..."
        );

        this.assets = [];

        this.initialized = true;

        Logger.info(
            "Asset Registry Ready."
        );

    },

    register(asset) {

        if (!asset) {

            Logger.error(
                "Invalid Asset."
            );

            return false;

        }

        this.assets.push(asset);

        Logger.info(
            "Registered : " + asset.id
        );

        return true;

    },

    get(assetId) {

        return this.assets.find(

            asset => asset.id === assetId

        );

    },

    getAll() {

        return this.assets;

    },

    exists(assetId) {

        return this.assets.some(

            asset => asset.id === assetId

        );

    },

    count() {

        return this.assets.length;

    },

    remove(assetId) {

        this.assets = this.assets.filter(

            asset => asset.id !== assetId

        );

        Logger.info(
            "Removed : " + assetId
        );

        return true;

    },

    clear() {

        this.assets = [];

        Logger.info(
            "Registry Cleared."
        );

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(AssetRegistry);
