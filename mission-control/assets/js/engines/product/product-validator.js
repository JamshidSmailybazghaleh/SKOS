/*
====================================================
SKOS Mission Control

Product Validator

File:
product-validator.js

Operation:
OP-003

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ProductValidator = {

    async validate(asset) {

        Logger.info(
            "Product Validation Started..."
        );

        if (!asset) {

            Logger.error(
                "Asset Is Null."
            );

            return false;

        }

        if (!asset.id) {

            Logger.error(
                "Missing Asset ID."
            );

            return false;

        }

        if (!asset.title) {

            Logger.error(
                "Missing Title."
            );

            return false;

        }

        if (!asset.category) {

            Logger.error(
                "Missing Category."
            );

            return false;

        }

        if (!asset.version) {

            Logger.error(
                "Missing Version."
            );

            return false;

        }

        if (!asset.author) {

            Logger.error(
                "Missing Author."
            );

            return false;

        }

        if (!asset.language) {

            Logger.error(
                "Missing Language."
            );

            return false;

        }

        if (!asset.license) {

            Logger.error(
                "Missing License."
            );

            return false;

        }

        if (!asset.status) {

            Logger.error(
                "Missing Status."
            );

            return false;

        }

        Logger.info(
            "Product Validation Passed."
        );

        return true;

    },

    validatePublication(product) {

        Logger.info(
            "Publication Validation..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        if (!product.id) {

            Logger.error(
                "Missing Product ID."
            );

            return false;

        }

        if (!product.format) {

            Logger.error(
                "Missing Product Format."
            );

            return false;

        }

        return true;

    }

};

Object.freeze(ProductValidator);
