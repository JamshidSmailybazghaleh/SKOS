/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Canonical Order Engine
 * Version   : 1.0.0
 * Status    : RECONSTRUCTION
 *
 * Lifecycle:
 * PENDING → PAID → DELIVERED → CLOSED
 *
 * Rule:
 * No order is considered persisted until a repository
 * confirms successful storage.
 *
 * ==========================================================
 */

"use strict";

class OrderEngine {

    constructor(options = {}) {

        this.name = "SKOS Order Engine";

        this.version = "1.0.0";

        this.status = "CREATED";

        this.repository =
            options.repository || null;

        this.orders = new Map();
    }


    initialize() {

        this.status = "INITIALIZED";

        return true;
    }


    createOrder(order = {}) {

        if (!order.orderId) {
            throw new Error(
                "Valid orderId is required."
            );
        }

        if (!order.productId) {
            throw new Error(
                "Valid productId is required."
            );
        }

        if (
            order.amount === undefined ||
            order.amount === null
        ) {
            throw new Error(
                "Valid amount is required."
            );
        }

        if (!order.currency) {
            throw new Error(
                "Valid currency is required."
            );
        }

        if (
            this.orders.has(order.orderId)
        ) {
            throw new Error(
                "Order already exists."
            );
        }

        const record = {

            ...order,

            id:
                order.id ||
                `order-${order.orderId}`,

            type: "ORDER",

            status: "PENDING",

            createdAt:
                order.createdAt ||
                new Date().toISOString(),

            paidAt: "",

            deliveredAt: "",

            closedAt: "",

            paymentReference:
                order.paymentReference || "",

            deliveryLink:
                order.deliveryLink || "",

            notes:
                order.notes || ""
        };


        if (this.repository) {

            if (
                typeof this.repository.save !==
                "function"
            ) {
                throw new Error(
                    "Repository does not provide save()."
                );
            }

            this.repository.save(record);
        }


        this.orders.set(
            record.orderId,
            record
        );


        return record;
    }


    getOrder(orderId) {

        if (
            this.orders.has(orderId)
        ) {
            return this.orders.get(
                orderId
            );
        }


        if (this.repository) {

            if (
                typeof this.repository.load !==
                "function"
            ) {
                throw new Error(
                    "Repository does not provide load()."
                );
            }

            return this.repository.load(
                `order-${orderId}`
            );
        }


        return null;
    }


    listOrders() {

        return Array.from(
            this.orders.values()
        );
    }


    updateStatus(
        orderId,
        status,
        data = {}
    ) {

        const order =
            this.getOrder(orderId);


        if (!order) {

            throw new Error(
                `Order not found: ${orderId}`
            );
        }


        const allowedStatuses = [
            "PENDING",
            "PAID",
            "DELIVERED",
            "CLOSED"
        ];


        if (
            !allowedStatuses.includes(status)
        ) {

            throw new Error(
                `Invalid order status: ${status}`
            );
        }


        order.status = status;


        if (status === "PAID") {

            order.paidAt =
                new Date().toISOString();
        }


        if (status === "DELIVERED") {

            order.deliveredAt =
                new Date().toISOString();
        }


        if (status === "CLOSED") {

            order.closedAt =
                new Date().toISOString();
        }


        Object.assign(
            order,
            data
        );


        if (this.repository) {

            if (
                typeof this.repository.update !==
                "function"
            ) {
                throw new Error(
                    "Repository does not provide update()."
                );
            }

            this.repository.update(
                order.id,
                order
            );
        }


        this.orders.set(
            orderId,
            order
        );


        return order;
    }


    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            orders:
                this.orders.size,

            persistence:
                this.repository
                    ? "CONNECTED"
                    : "NOT_CONNECTED"
        };
    }
}


module.exports =
    OrderEngine;
