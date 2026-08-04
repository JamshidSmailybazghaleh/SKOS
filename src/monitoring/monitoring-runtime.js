/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Runtime
 * File      : monitoring-runtime.js
 *
 * Build     : BUILD-000800.4
 * Version   : 1.0.0
 * ==========================================================
 */

class MonitoringRuntime {

    constructor() {

        this.name =
            "SKOS Monitoring Runtime";

        this.version =
            "1.0.0";

        this.status =
            "INITIALIZED";

        this.monitors = [];

        this.metrics = {};

        this.events = [];

        this.startedAt = null;

    }


    registerMonitor(monitor) {

        if (!monitor) {

            throw new Error(
                "Monitor is required."
            );

        }

        this.monitors.push(monitor);

        return true;

    }


    async start() {

        this.status =
            "STARTING";

        this.startedAt =
            new Date();


        for (const monitor of this.monitors) {

            if (
                typeof monitor.start === "function"
            ) {

                await monitor.start();

            }

        }


        this.status =
            "READY";


        this.recordEvent({

            type:
                "MONITORING_STARTED",

            timestamp:
                new Date()

        });


        return true;

    }


    async collect() {

        for (const monitor of this.monitors) {

            if (
                typeof monitor.collect === "function"
            ) {

                const data =
                    await monitor.collect();


                this.metrics[
                    monitor.name
                ] = data;

            }

        }


        return this.metrics;

    }


    async healthCheck() {

        const result = [];


        for (const monitor of this.monitors) {

            if (
                typeof monitor.health === "function"
            ) {

                result.push({

                    name:
                        monitor.name,

                    status:
                        await monitor.health()

                });

            }

        }


        return result;

    }


    recordEvent(event) {

        this.events.push(event);

        return true;

    }


    getEvents() {

        return this.events;

    }


    getMetrics() {

        return this.metrics;

    }


    async shutdown() {


        for (const monitor of this.monitors) {

            if (
                typeof monitor.shutdown === "function"
            ) {

                await monitor.shutdown();

            }

        }


        this.status =
            "STOPPED";


        this.recordEvent({

            type:
                "MONITORING_STOPPED",

            timestamp:
                new Date()

        });


        return true;

    }


    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            monitors:
                this.monitors.length,

            metrics:
                Object.keys(this.metrics).length,

            events:
                this.events.length,

            startedAt:
                this.startedAt

        };

    }

}


module.exports =
    MonitoringRuntime;
