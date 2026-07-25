/*
====================================================
SKOS Mission Control

Product History

File:
product-history.js

Operation:
OP-003

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const ProductHistory = {

    history: [],

    async initialize() {

        Logger.info(
            "Product History Initializing..."
        );

        this.history = [];

        return true;

    },

    add(productId, action, details = "") {

        const record = {

            timestamp: new Date().toISOString(),

            productId: productId,

            action: action,

            details: details

        };

        this.history.push(record);

        Logger.info(
            "History Added : " +
            productId +
            " -> " +
            action
        );

        return true;

    },

    get(productId) {

        return this.history.filter(

            record => record.productId === productId

        );

    },

    getAll() {

        return this.history;

    },

    count() {

        return this.history.length;

    },

    clear() {

        this.history = [];

        Logger.info(
            "Product History Cleared."
        );

    }

};

Object.freeze(ProductHistory);
