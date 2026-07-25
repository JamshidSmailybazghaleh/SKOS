/*
====================================================
SKOS Mission Control

Sales History

File:
sales-history.js

Operation:
OP-004

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const SalesHistory = {

    initialized: false,

    records: [],

    async initialize() {

        Logger.info(
            "Sales History Initializing..."
        );

        this.records = [];

        this.initialized = true;

        Logger.info(
            "Sales History Ready."
        );

        return true;

    },

    add(record) {

        if (!record) {

            Logger.error(
                "Invalid Sales Record."
            );

            return false;

        }

        const salesRecord = {

            salesId: this.generateSalesId(),

            timestamp: new Date().toISOString(),

            invoiceId: record.invoiceId || null,

            paymentId: record.paymentId || null,

            productId: record.productId || null,

            assetId: record.assetId || null,

            customerId: record.customerId || null,

            amount: record.amount || 0,

            currency: record.currency || "GBP",

            status: record.status || "UNKNOWN",

            notes: record.notes || ""

        };

        this.records.push(salesRecord);

        Logger.info(
            "Sales Record Added : " +
            salesRecord.salesId
        );

        return salesRecord;

    },

    get(salesId) {

        return this.records.find(
            record => record.salesId === salesId
        );

    },

    getAll() {

        return this.records;

    },

    count() {

        return this.records.length;

    },

    clear() {

        this.records = [];

        Logger.info(
            "Sales History Cleared."
        );

    },

    generateSalesId() {

        return "SALE-" + Date.now();

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(SalesHistory);
