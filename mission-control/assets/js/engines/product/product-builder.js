/*
====================================================
SKOS Mission Control

Product Builder

File:
product-builder.js

Operation:
OP-003

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ProductBuilder = {

    async build(asset) {

        Logger.info(
            "Product Builder Started..."
        );

        if (!asset) {

            Logger.error(
                "Invalid Asset."
            );

            return false;

        }

        const product = {

            id: this.generateProductId(asset),

            assetId: asset.id,

            title: asset.title,

            category: asset.category,

            version: asset.version,

            language: asset.language,

            author: asset.author,

            license: asset.license,

            status: "READY",

            format: "DIGITAL",

            createdAt: new Date().toISOString(),

            updatedAt: new Date().toISOString()

        };

        Logger.info(
            "Product Built : " + product.id
        );

        return product;

    },

    generateProductId(asset) {

        const timestamp = Date.now();

        return "PRODUCT-" + timestamp;

    }

};

Object.freeze(ProductBuilder);
