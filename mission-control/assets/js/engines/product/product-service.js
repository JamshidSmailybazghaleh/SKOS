/*
====================================================
SKOS Mission Control

Product Service

File:
product-service.js

Operation:
OP-003

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ProductService = {

    async initialize() {

        Logger.info(
            "Product Service Initializing..."
        );

        return true;

    },

    async create(assetId) {

        Logger.info(
            "Creating Product..."
        );

        const product =
            await ProductPipeline.build(assetId);

        if (!product) {

            Logger.error(
                "Product Creation Failed."
            );

            return false;

        }

        ProductHistory.add(
            product.id,
            "CREATED",
            "Product Created"
        );

        Logger.info(
            "Product Created : " + product.id
        );

        return product;

    },

    async update(product) {

        Logger.info(
            "Updating Product..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        ProductHistory.add(
            product.id,
            "UPDATED",
            "Product Updated"
        );

        Logger.info(
            "Product Updated : " + product.id
        );

        return true;

    },

    async publish(product) {

        Logger.info(
            "Publishing Product..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        ProductHistory.add(
            product.id,
            "PUBLISHED",
            "Ready For Publication"
        );

        Logger.info(
            "Product Ready : " + product.id
        );

        return true;

    },

    async archive(product) {

        Logger.info(
            "Archiving Product..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        ProductHistory.add(
            product.id,
            "ARCHIVED",
            "Archived"
        );

        Logger.info(
            "Product Archived : " + product.id
        );

        return true;

    }

};

Object.freeze(ProductService);
