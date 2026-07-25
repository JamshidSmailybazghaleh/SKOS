/*
====================================================
SKOS Mission Control

Asset Service

File:
asset-service.js

Operation:
OP-002

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AssetService = {

    async initialize() {

        Logger.info(
            "Asset Service Initializing..."
        );

        return true;

    },

    async create(asset) {

        Logger.info(
            "Creating Asset..."
        );

        if (!asset) {

            Logger.error(
                "Invalid Asset."
            );

            return false;

        }

        if (AssetRegistry.exists(asset.id)) {

            Logger.error(
                "Asset Already Exists."
            );

            return false;

        }

        AssetRegistry.register(asset);

        Logger.info(
            "Asset Created : " + asset.id
        );

        return true;

    },

    async update(asset) {

        Logger.info(
            "Updating Asset..."
        );

        if (!asset) {

            Logger.error(
                "Invalid Asset."
            );

            return false;

        }

        const existing =
            AssetRegistry.get(asset.id);

        if (!existing) {

            Logger.error(
                "Asset Not Found."
            );

            return false;

        }

        Object.assign(existing, asset);

        Logger.info(
            "Asset Updated : " + asset.id
        );

        return true;

    },

    async delete(assetId) {

        Logger.info(
            "Deleting Asset..."
        );

        if (!AssetRegistry.exists(assetId)) {

            Logger.error(
                "Asset Not Found."
            );

            return false;

        }

        AssetRegistry.remove(assetId);

        Logger.info(
            "Asset Deleted : " + assetId
        );

        return true;

    },

    async get(assetId) {

        return AssetRegistry.get(assetId);

    },

    async list() {

        return AssetRegistry.getAll();

    },

    async count() {

        return AssetRegistry.count();

    }

};

Object.freeze(AssetService);
