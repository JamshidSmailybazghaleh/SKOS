/*
====================================================
SKOS Mission Control

Revenue Engine

BUILD-000373

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

const RevenueEngine = {

    transactions: [],

    statistics: {

        totalRevenue: 0,

        totalSales: 0

    },

    async initialize() {

        Logger.info(
            "Revenue Engine Initializing..."
        );

        return true;

    },

    async register(transaction) {

        if (!transaction) {

            throw new Error(
                "Transaction Required."
            );

        }

        transaction.id =
            transaction.id ||
            "TRX-" + Date.now();

        transaction.createdAt =
            new Date().toISOString();

        this.transactions.push(transaction);

        this.statistics.totalSales += 1;

        this.statistics.totalRevenue +=
            Number(transaction.amount || 0);

        AuditService.record(
            "REVENUE_REGISTERED",
            transaction
        );

        return transaction;

    },

    async totalRevenue() {

        return this.statistics.totalRevenue;

    },

    async totalSales() {

        return this.statistics.totalSales;

    },

    async revenueByProduct(productId) {

        return this.transactions.filter(

            transaction =>

            transaction.productId === productId

        );

    },

    async revenueByCustomer(customerId) {

        return this.transactions.filter(

            transaction =>

            transaction.customerId === customerId

        );

    },

    async report() {

        return {

            revenue:

                this.statistics.totalRevenue,

            sales:

                this.statistics.totalSales,

            transactions:

                this.transactions.length

        };

    },

    status() {

        return "READY";

    }

};

window.RevenueEngine =
    RevenueEngine;

Object.freeze(
    RevenueEngine
);
