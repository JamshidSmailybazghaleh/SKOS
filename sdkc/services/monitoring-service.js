/*
====================================================
SKOS Mission Control

Monitoring Service

BUILD-000379

Version:
1.0.0

Status:
ACTIVE
====================================================
*/

class MonitoringService {

    constructor() {

        this.metrics = [];

        this.health = new Map();

        this.alerts = [];

        this.initialized = false;

    }


    async initialize() {

        Logger.info(
            "Monitoring Service Initializing..."
        );

        this.initialized = true;

        return true;

    }


    registerComponent(name) {

        this.health.set(

            name,

            {

                status: "UNKNOWN",

                lastCheck:
                    null

            }

        );

    }


    checkHealth(name) {

        const component =

            this.health.get(name);


        if (!component) {

            throw new Error(
                "Component Not Registered."
            );

        }


        component.status = "HEALTHY";

        component.lastCheck =

            new Date().toISOString();


        return component;

    }


    recordMetric(metric) {

        const record = {

            metricId:

                "MET-" + Date.now(),

            ...metric,

            timestamp:

                new Date().toISOString()

        };


        this.metrics.push(record);


        return record;

    }


    createAlert(

        type,

        message

    ) {

        const alert = {

            alertId:

                "ALT-" + Date.now(),

            type,

            message,

            timestamp:

                new Date().toISOString(),

            status:

                "OPEN"

        };


        this.alerts.push(alert);


        AuditService.record(

            "SYSTEM_ALERT",

            alert

        );


        return alert;

    }


    getMetrics() {

        return this.metrics;

    }


    getAlerts() {

        return this.alerts;

    }


    systemStatus() {

        return {

            services:

                this.health.size,

            metrics:

                this.metrics.length,

            alerts:

                this.alerts.length,

            status:

                "OPERATIONAL"

        };

    }


    status() {

        return {

            initialized:

                this.initialized

        };

    }

}


window.MonitoringService =

    new MonitoringService();


Object.freeze(

    window.MonitoringService

);
