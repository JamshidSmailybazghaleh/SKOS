/*
====================================================
SKOS Mission Control

Bookstore Engine

BUILD-000372

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

const BookstoreEngine = {

    products: new Map(),

    async initialize() {

        Logger.info(
            "Bookstore Engine Initializing..."
        );

        return true;

    },

    async createProduct(object) {

        if (!object) {

            throw new Error(
                "Knowledge Object Required."
            );

        }

        const product = {

            productId:
                "PRD-" + object.id,

            objectId:
                object.id,

            title:
                object.title,

            version:
                object.version,

            author:
                object.metadata.author,

            category:
                object.metadata.category,

            price: 0,

            currency: "IRR",

            license:
                "PERSONAL",

            status:
                "ACTIVE",

            createdAt:
                new Date().toISOString()

        };

        this.products.set(

            product.productId,

            product

        );

        Logger.info(

            "Product Created: " +

            product.productId

        );

        return product;

    },

    async publish(productId) {

        const product =

            this.products.get(productId);

        if (!product) {

            throw new Error(
                "Product Not Found."
            );

        }

        product.status = "PUBLISHED";

        return product;

    },

    async getProduct(productId) {

        return this.products.get(

            productId

        );

    },

    async listProducts() {

        return Array.from(

            this.products.values()

        );

    },

    async updatePrice(

        productId,

        price,

        currency = "IRR"

    ) {

        const product =

            this.products.get(productId);

        if (!product) {

            throw new Error(
                "Product Not Found."
            );

        }

        product.price = price;

        product.currency = currency;

        return product;

    },

    async assignLicense(

        productId,

        license

    ) {

        const product =

            this.products.get(productId);

        if (!product) {

            throw new Error(
                "Product Not Found."
            );

        }

        product.license = license;

        return product;

    },

    status() {

        return {

            products:

                this.products.size

        };

    }

};

window.BookstoreEngine =
    BookstoreEngine;

Object.freeze(
    BookstoreEngine
);
