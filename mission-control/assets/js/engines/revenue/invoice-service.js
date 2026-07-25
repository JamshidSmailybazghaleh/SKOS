/*
====================================================
SKOS Mission Control

Invoice Service

File:
invoice-service.js

Operation:
OP-004

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const InvoiceService = {

    initialized: false,

    async initialize() {

        Logger.info(
            "Invoice Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Invoice Service Ready."
        );

        return true;

    },

    async create(product, pricing, license) {

        Logger.info(
            "Creating Invoice..."
        );

        if (!product || !pricing || !license) {

            Logger.error(
                "Invalid Invoice Data."
            );

            return false;

        }

        const invoice = {

            invoiceId:
                this.generateInvoiceId(),

            productId:
                product.id,

            assetId:
                product.assetId,

            licenseId:
                license.licenseId,

            title:
                product.title,

            amount:
                pricing.finalPrice,

            currency:
                pricing.currency,

            status:
                "UNPAID",

            createdAt:
                new Date().toISOString(),

            paidAt:
                null

        };

        Logger.info(
            "Invoice Created : " +
            invoice.invoiceId
        );

        return invoice;

    },

    async markPaid(invoice) {

        if (!invoice) {

            Logger.error(
                "Invalid Invoice."
            );

            return false;

        }

        invoice.status = "PAID";

        invoice.paidAt =
            new Date().toISOString();

        Logger.info(
            "Invoice Paid : " +
            invoice.invoiceId
        );

        return invoice;

    },

    async cancel(invoice) {

        if (!invoice) {

            Logger.error(
                "Invalid Invoice."
            );

            return false;

        }

        invoice.status = "CANCELLED";

        Logger.info(
            "Invoice Cancelled : " +
            invoice.invoiceId
        );

        return invoice;

    },

    generateInvoiceId() {

        return "INV-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(InvoiceService);
