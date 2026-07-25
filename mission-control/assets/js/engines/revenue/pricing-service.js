/*
====================================================
SKOS Mission Control

Pricing Service

File:
pricing-service.js

Operation:
OP-004

Version:
1.0

Status:
DEVELOPMENT
====================================================
*/

const PricingService = {

    currency: "GBP",

    async initialize() {

        Logger.info(
            "Pricing Service Initializing..."
        );

        return true;

    },

    async calculate(product) {

        Logger.info(
            "Calculating Product Price..."
        );

        if (!product) {

            Logger.error(
                "Invalid Product."
            );

            return false;

        }

        const price = this.basePrice(product);

        return {

            productId: product.id,

            currency: this.currency,

            basePrice: price,

            discount: 0,

            finalPrice: price

        };

    },

    basePrice(product) {

        switch (product.category) {

            case "BOOK":
                return 10;

            case "COURSE":
                return 50;

            case "SOFTWARE":
                return 100;

            case "DATASET":
                return 30;

            default:
                return 5;

        }

    },

    applyDiscount(price, percent) {

        return price - (
            price * percent / 100
        );

    },

    changeCurrency(currency) {

        this.currency = currency;

    }

};

Object.freeze(PricingService);
