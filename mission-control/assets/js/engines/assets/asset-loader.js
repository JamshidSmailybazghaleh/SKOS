/*
====================================================
SKOS Mission Control

Asset Loader

File:
asset-loader.js

Operation:
OP-002

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AssetLoader = {

    initialized: false,

    source: null,


    async initialize() {

        Logger.info(
            "Asset Loader Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Asset Loader Ready."
        );

        return true;

    },


    async loadFromSource(source) {

        Logger.info(
            "Loading Assets From : " + source
        );


        this.source = source;


        try {

            const response = await fetch(source);


            if (!response.ok) {

                throw new Error(
                    "Asset source unavailable."
                );

            }


            const assets =
                await response.json();


            return await this.registerAssets(
                assets
            );


        }

        catch(error) {

            Logger.error(
                "Asset Loading Failed : " +
                error.message
            );


            return false;

        }

    },


    async registerAssets(assets) {


        if (!Array.isArray(assets)) {

            Logger.error(
                "Invalid Asset Collection."
            );

            return false;

        }


        for (const asset of assets) {


            const valid =
                await AssetValidator.validate(
                    asset
                );


            if (!valid) {

                Logger.warn(
                    "Skipped Invalid Asset : " +
                    asset.id
                );

                continue;

            }


            AssetRegistry.register(
                asset
            );


            AssetHistory.add(
                asset.id,
                "LOADED",
                "Loaded by Asset Loader"
            );


        }


        AssetIndex.build();


        Logger.info(
            "Assets Loaded Successfully."
        );


        return true;

    },


    async reload() {

        if (!this.source) {

            Logger.warn(
                "No Previous Source."
            );

            return false;

        }


        return await this.loadFromSource(
            this.source
        );

    },


    isInitialized() {

        return this.initialized;

    }

};


Object.freeze(AssetLoader);
