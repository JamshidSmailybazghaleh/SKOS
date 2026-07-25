/*
====================================================
SKOS Mission Control

Digital Product Pipeline

File:
product-pipeline.js

Operation:
OP-003

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ProductPipeline = {

    version: "1.0",

    initialized: false,

    async initialize() {

        Logger.info(
            "Product Pipeline Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Product Pipeline Ready."
        );

        return true;

    },

    async build(assetId) {

        Logger.info(
            "Building Product : " + assetId
        );

        const asset =
            await AssetService.get(assetId);

        if (!asset) {

            Logger.error(
                "Asset Not Found."
            );

            return false;

        }

        const valid =
            await ProductValidator.validate(asset);

        if (!valid) {

            Logger.error(
                "Product Validation Failed."
            );

            return false;

        }

        const product =
            await ProductBuilder.build(asset);

        if (!product) {

            Logger.error(
                "Product Build Failed."
            );

            return false;

        }

        Logger.info(
            "Product Pipeline Completed."
        );

        return product;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(ProductPipeline);
