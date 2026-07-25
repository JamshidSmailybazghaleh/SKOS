/*
====================================================
SKOS Mission Control

Asset Validator

File:
asset-validator.js

Operation:
OP-002

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const AssetValidator = {

    async validate(asset) {

        Logger.info(
            "Asset Validation Started..."
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

        if (!asset.language) {

            Logger.error(
                "Missing Language."
            );

            return false;

        }

        if (!asset.author) {

            Logger.error(
                "Missing Author."
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
            "Asset Validation Passed."
        );

        return true;

    }

};

Object.freeze(AssetValidator);
