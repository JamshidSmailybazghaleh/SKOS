/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine  : Monitoring Engine
 * File    : monitoring-engine.js
 *
 * Build   : BUILD-000438
 * Version : 1.0.0
 *
 * Mission:
 * Central monitoring, telemetry, health checking,
 * metrics collection and event management.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class MonitoringEngine {

    constructor(options = {}) {

        this.name = "Monitoring Engine";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.events = [];
        this.metrics = new Map();
        this.health = new Map();
        this.components = new Map();
        this.alerts = [];
        this.history = [];

        this.options = options;
    }


    initialize() {

        this.status = "INITIALIZED";

        this.recordEvent(
            "MONITORING_ENGINE_INITIALIZED"
        );

        return true;
    }


    registerComponent(
        componentId,
        metadata = {}
    ) {

        if (!componentId) {
            throw new Error(
                "Component id required."
            );
        }

        const component = {

            id: componentId,

            name:
                metadata.name || componentId,

            version:
                metadata.version || "1.0.0",

            status:
                "ONLINE",

            registeredAt:
                new Date()

        };

        this.components.set(
            componentId,
            component
        );

        this.recordEvent(
            "COMPONENT_REGISTERED",
            component
        );

        return component;
    }


    recordEvent(
        event,
        metadata = {}
    ) {

        const record = {

            event,

            metadata,

            timestamp:
                new Date()

        };

        this.events.push(record);

        this.history.push(record);

        return record;
    }


    recordMetric(
        metricName,
        value
    ) {

        if (!metricName) {

            throw new Error(
                "Metric name required."
            );

        }

        const metric = {

            value,

            timestamp:
                new Date()

        };

        this.metrics.set(
            metricName,
            metric
        );

        return metric;
    }


    updateHealth(
        componentId,
        state
    ) {

        this.health.set(

            componentId,

            {

                state,

                updatedAt:
                    new Date()

            }

        );

        return true;
    }


    createAlert(
        level,
        message
    ) {

        const alert = {

            id:
                `ALERT-${Date.now()}`,

            level,

            message,

            timestamp:
                new Date()

        };

        this.alerts.push(alert);

        this.recordEvent(
            "ALERT_CREATED",
            alert
        );

        return alert;
    }


    getComponent(
        componentId
    ) {

        return this.components.get(
            componentId
        );

    }


    getComponents() {

        return Array.from(

            this.components.values()

        );

    }


    getEvents() {

        return this.events;

    }


    getMetrics() {

        return Array.from(

            this.metrics.entries()

        );

    }


    getHealth() {

        return Array.from(

            this.health.entries()

        );

    }


    getAlerts() {

        return this.alerts;

    }


    getStatistics() {

        return {

            components:
                this.components.size,

            events:
                this.events.length,

            metrics:
                this.metrics.size,

            healthChecks:
                this.health.size,

            alerts:
                this.alerts.length

        };

    }


    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            components:
                this.components.size,

            events:
                this.events.length

        };

    }


    shutdown() {

        this.status =
            "SHUTDOWN";

        this.recordEvent(
            "MONITORING_ENGINE_SHUTDOWN"
        );

        return true;
    }

}

module.exports = MonitoringEngine;
