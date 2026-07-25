/*
====================================================
SKOS Mission Control

Publication Validator

File:
publication-validator.js

Engine:
OP-001

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PublicationValidator = {

    async validate(asset) {

        Logger.info(
            "Publication Validator Started"
        );

        if (!asset) {

            Logger.error(
                "Asset not found."
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

        Logger.info(
            "Publication Validation Passed."
        );

        return true;

    }

};

Object.freeze(PublicationValidator);
