/*
====================================================
SKOS Mission Control

License Service

File:
license-service.js

Operation:
OP-004

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const LicenseService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "License Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "License Service Ready."
        );

        return true;

    },

    async generate(product) {

        Logger.info(
            "Generating License..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        const license = {

            licenseId:
                this.generateLicenseId(),

            productId:
                product.id,

            assetId:
                product.assetId,

            type:
                "STANDARD",

            status:
                "ACTIVE",

            issuedAt:
                new Date().toISOString(),

            expiresAt:
                null

        };

        Logger.info(
            "License Generated : " +
            license.licenseId
        );

        return license;

    },

    async revoke(license) {

        if (!license) {

            Logger.error(
                "Invalid License."
            );

            return false;

        }

        license.status = "REVOKED";

        license.revokedAt =
            new Date().toISOString();

        Logger.info(
            "License Revoked : " +
            license.licenseId
        );

        return license;

    },

    async renew(license) {

        if (!license) {

            Logger.error(
                "Invalid License."
            );

            return false;

        }

        license.status = "ACTIVE";

        license.renewedAt =
            new Date().toISOString();

        Logger.info(
            "License Renewed : " +
            license.licenseId
        );

        return license;

    },

    generateLicenseId() {

        return "LIC-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(LicenseService);
