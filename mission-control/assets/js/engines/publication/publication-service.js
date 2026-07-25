/*
====================================================
SKOS Mission Control

Publication Service

File:
publication-service.js

Engine:
OP-001

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PublicationService = {

    async execute(asset) {

        Logger.info(
            "Publication Service Started"
        );

        if (!asset) {

            Logger.error(
                "No Asset Supplied."
            );

            return false;

        }

        const valid =
            await PublicationEngine.validate(asset);

        if (!valid) {

            Logger.error(
                "Validation Failed."
            );

            return false;

        }

        const packaged =
            await PublicationEngine.buildPackage(asset);

        if (!packaged) {

            Logger.error(
                "Package Failed."
            );

            return false;

        }

        const distributed =
            await PublicationEngine.distribute(asset);

        if (!distributed) {

            Logger.error(
                "Distribution Failed."
            );

            return false;

        }

        await PublicationEngine.archive(asset);

        Logger.info(
            "Publication Completed."
        );

        return true;

    }

};

Object.freeze(PublicationService);
