/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring API
 * File      : monitoring-api.js
 *
 * Build     : BUILD-000448.1
 * Version   : 1.0.0
 *
 * Mission:
 * Bridge between Monitoring Engine
 * and Mission Control Dashboard.
 *
 * ==========================================================
 */

class MonitoringAPI {

    constructor(monitoringEngine = null) {

        this.name =
            "Monitoring API";

        this.version =
            "1.0.0";

        this.monitoring =
            monitoringEngine;

    }



    attach(engine) {

        this.monitoring =
            engine;

        return true;

    }



    getRuntimeStatus() {

        if (!this.monitoring)
            return {};

        return {

            runtime:
                "RUNNING",

            uptime:
                this.monitoring.getUptime(),

            version:
                this.monitoring.version

        };

    }



    getHealthStatus() {

        if (!this.monitoring)
            return [];

        return this.monitoring
            .getHealthStatus();

    }



    getMetrics() {

        if (!this.monitoring)
            return [];

        return this.monitoring
            .getMetrics();

    }



    getPerformance() {

        if (!this.monitoring)
            return [];

        return this.monitoring
            .getPerformance();

    }



    getEvents(limit = 100) {

        if (!this.monitoring)
            return [];

        return this.monitoring
            .getEvents(limit);

    }



    getAlerts() {

        if (!this.monitoring)
            return [];

        return this.monitoring
            .getAlerts();

    }



    getOpenAlerts() {

        if (!this.monitoring)
            return [];

        return this.monitoring
            .getOpenAlerts();

    }



    getStatistics() {

        if (!this.monitoring)
            return {};

        return {

            runtime:

                this.getRuntimeStatus(),

            health:

                this.getHealthStatus(),

            metrics:

                this.getMetrics(),

            performance:

                this.getPerformance(),

            alerts:

                this.getAlerts(),

            events:

                this.getEvents()

        };

    }



    exportJSON() {

        return JSON.stringify(

            this.getStatistics(),

            null,

            2

        );

    }



    exportObject() {

        return this.getStatistics();

    }

}

module.exports =
    MonitoringAPI;
