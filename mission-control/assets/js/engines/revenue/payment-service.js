/*
====================================================
SKOS Mission Control

Payment Service

File:
payment-service.js

Operation:
OP-004

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PaymentService = {

    initialized: false,

    provider: "OFFLINE",

    async initialize() {

        Logger.info(
            "Payment Service Initializing..."
        );

        this.initialized = true;

        Logger.info(
            "Payment Service Ready."
        );

        return true;

    },

    async process(invoice) {

        Logger.info(
            "Payment Processing Started..."
        );

        if (!invoice) {

            Logger.error(
                "Invalid Invoice."
            );

            return false;

        }

        const payment = {

            paymentId:
                this.generatePaymentId(),

            invoiceId:
                invoice.invoiceId,

            provider:
                this.provider,

            status:
                "PENDING",

            amount:
                invoice.amount,

            currency:
                invoice.currency,

            createdAt:
                new Date().toISOString()

        };

        Logger.info(
            "Payment Created : " +
            payment.paymentId
        );

        return payment;

    },

    async confirm(payment) {

        if (!payment) {

            Logger.error(
                "Invalid Payment."
            );

            return false;

        }

        payment.status = "PAID";

        payment.paidAt =
            new Date().toISOString();

        Logger.info(
            "Payment Confirmed : " +
            payment.paymentId
        );

        return payment;

    },

    async cancel(payment) {

        if (!payment) {

            Logger.error(
                "Invalid Payment."
            );

            return false;

        }

        payment.status = "CANCELLED";

        Logger.info(
            "Payment Cancelled : " +
            payment.paymentId
        );

        return payment;

    },

    generatePaymentId() {

        return "PAY-" + Date.now();

    },

    changeProvider(provider) {

        this.provider = provider;

    },

    isInitialized() {

        return this.initialized;

    }

};

Object.freeze(PaymentService);
