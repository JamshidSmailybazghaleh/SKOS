/*
====================================================
SKOS Mission Control

Revenue Pipeline

File:
revenue-pipeline.js

Operation:
OP-004

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const RevenuePipeline = {

    version: "1.0",

    initialized: false,

    async initialize() {

        Logger.info(
            "Revenue Pipeline Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Revenue Pipeline Ready."
        );

        return true;

    },

    async process(product) {

        Logger.info(
            "Revenue Pipeline Started..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        const pricing =
            await PricingService.calculate(product);

        if (!pricing) {

            Logger.error(
                "Pricing Failed."
            );

            return false;

        }

        const license =
            await LicenseService.generate(product);

        if (!license) {

            Logger.error(
                "License Generation Failed."
            );

            return false;

        }

        const invoice =
            await InvoiceService.create(

                product,

                pricing,

                license

            );

        if (!invoice) {

            Logger.error(
                "Invoice Creation Failed."
            );

            return false;

        }

        Logger.info(
            "Revenue Pipeline Completed."
        );

        return {

            product: product,

            pricing: pricing,

            license: license,

            invoice: invoice

        };

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(RevenuePipeline);
