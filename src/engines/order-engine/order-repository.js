/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Order Repository
 * Version   : 1.0.0
 * Status    : RECONSTRUCTION
 *
 * Purpose:
 *   Persistent local storage adapter for Order Engine.
 *
 * Design:
 *   - File-backed persistence
 *   - No external service dependency
 *   - Explicit save/load/update operations
 *   - Fail loudly on persistence errors
 *
 * ==========================================================
 */

"use strict";

const fs = require("fs");
const path = require("path");

class OrderRepository {

    constructor(options = {}) {

        this.name =
            "SKOS Order Repository";

        this.version =
            "1.0.0";

        this.basePath =
            options.basePath ||
            path.join(
                process.cwd(),
                "SKOS-DATA",
                "099-SYSTEM",
                "commerce"
            );

        this.fileName =
            options.fileName ||
            "orders.json";

        this.filePath =
            path.join(
                this.basePath,
                this.fileName
            );

        this.ensureStorage();
    }


    ensureStorage() {

        fs.mkdirSync(
            this.basePath,
            {
                recursive: true
            }
        );


        if (!fs.existsSync(
            this.filePath
        )) {

            this.writeData({
                version: "1.0.0",
                lastUpdated: "",
                orders: []
            });
        }
    }


    readData() {

        const raw =
            fs.readFileSync(
                this.filePath,
                "utf8"
            );


        if (!raw.trim()) {

            return {
                version: "1.0.0",
                lastUpdated: "",
                orders: []
            };
        }


        const data =
            JSON.parse(raw);


        if (
            !data ||
            typeof data !== "object"
        ) {

            throw new Error(
                "Invalid order repository data."
            );
        }


        if (
            !Array.isArray(data.orders)
        ) {

            data.orders = [];
        }


        return data;
    }


    writeData(data) {

        const payload = {

            version:
                data.version ||
                "1.0.0",

            lastUpdated:
                new Date().toISOString(),

            orders:
                Array.isArray(data.orders)
                    ? data.orders
                    : []
        };


        fs.writeFileSync(
            this.filePath,
            JSON.stringify(
                payload,
                null,
                2
            ),
            "utf8"
        );


        return true;
    }


    save(order) {

        if (
            !order ||
            !order.id ||
            !order.orderId
        ) {

            throw new Error(
                "Valid order is required."
            );
        }


        const data =
            this.readData();


        const exists =
            data.orders.some(
                item =>
                    item.orderId ===
                    order.orderId
            );


        if (exists) {

            throw new Error(
                "Order already exists."
            );
        }


        data.orders.push(
            order
        );


        this.writeData(
            data
        );


        return order;
    }


    load(id) {

        const data =
            this.readData();


        return (
            data.orders.find(
                order =>
                    order.id === id
            ) ||
            null
        );
    }


    loadByOrderId(orderId) {

        const data =
            this.readData();


        return (
            data.orders.find(
                order =>
                    order.orderId ===
                    orderId
            ) ||
            null
        );
    }


    update(id, order) {

        const data =
            this.readData();


        const index =
            data.orders.findIndex(
                item =>
                    item.id === id
            );


        if (index === -1) {

            throw new Error(
                `Order not found: ${id}`
            );
        }


        data.orders[index] =
            order;


        this.writeData(
            data
        );


        return order;
    }


    list() {

        const data =
            this.readData();


        return data.orders;
    }


    count() {

        return this.list().length;
    }


    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            file:
                this.filePath,

            orders:
                this.count(),

            persistence:
                "CONNECTED"
        };
    }
}


module.exports =
    OrderRepository;
