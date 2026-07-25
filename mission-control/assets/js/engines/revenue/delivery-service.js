/*
====================================================
SKOS Mission Control

Delivery Service

File:
delivery-service.js

Operation:
OP-004

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const DeliveryService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Delivery Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Delivery Service Ready."
        );

        return true;

    },

    async deliver(product, license) {

        Logger.info(
            "Delivery Started..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        if (!license) {

            Logger.error(
                "Invalid License."
            );

            return false;

        }

        const delivery = {

            deliveryId:
                this.generateDeliveryId(),

            productId:
                product.id,

            licenseId:
                license.licenseId,

            status:
                "DELIVERED",

            method:
                this.detectMethod(product),

            deliveredAt:
                new Date().toISOString()

        };

        Logger.info(
            "Delivery Completed : " +
            delivery.deliveryId
        );

        return delivery;

    },

    detectMethod(product) {

        switch (product.format) {

            case "PDF":
                return "DOWNLOAD";

            case "EPUB":
                return "DOWNLOAD";

            case "HTML":
                return "ONLINE";

            case "COURSE":
                return "PORTAL";

            case "SOFTWARE":
                return "INSTALLER";

            default:
                return "DOWNLOAD";

        }

    },

    async revoke(delivery) {

        if (!delivery) {

            Logger.error(
                "Invalid Delivery."
            );

            return false;

        }

        delivery.status = "REVOKED";

        delivery.revokedAt =
            new Date().toISOString();

        Logger.info(
            "Delivery Revoked."
        );

        return true;

    },

    generateDeliveryId() {

        return "DEL-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(DeliveryService);
