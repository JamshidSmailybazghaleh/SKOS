/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Dashboard Bridge
 * File      : monitoring-dashboard-bridge.js
 *
 * Build     : BUILD-000809.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide a controlled operational data bridge
 * between SKOS Monitoring Runtime and
 * Mission Control Dashboard.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class MonitoringDashboardBridge {


    constructor(

        runtime = null,

        options = {}

    ) {


        this.name =
            "Monitoring Dashboard Bridge";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.runtime =
            runtime;


        this.options =
            options;


        this.lastSnapshot =
            null;


        this.history =
            [];


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent({

            type:
                "DASHBOARD_BRIDGE_INITIALIZED",

            timestamp:
                new Date()

        });


        return true;

    }





    connectRuntime(

        runtime

    ) {


        if (!runtime) {


            throw new Error(

                "Monitoring runtime is required."

            );

        }



        this.runtime =
            runtime;



        this.status =
            "CONNECTED";



        this.recordEvent({

            type:
                "RUNTIME_CONNECTED",

            timestamp:
                new Date()

        });



        return true;

    }





    getDashboardState() {


        if (!this.runtime) {


            throw new Error(

                "Monitoring runtime not connected."

            );

        }



        const runtimeStatus =

            this.runtime.getStatus();



        const metrics =

            this.runtime.getMetrics();



        const events =

            this.runtime.getEvents();




        const state = {


            timestamp:

                new Date(),



            runtime:

                runtimeStatus,



            metrics:



                metrics,



            events:



                events.length,


            alerts:

                this.getAlertSummary(),



            health:

                this.getHealthSummary()



        };



        this.lastSnapshot =
            state;



        return state;

    }





    getHealthSummary() {


        if (

            this.runtime.healthMonitor

        ) {


            return this.runtime.healthMonitor
                .getStatistics();

        }



        return {


            status:
                "UNKNOWN"

        };


    }





    getMetricsSummary() {


        if (

            this.runtime.metricsCollector

        ) {


            return this.runtime.metricsCollector
                .getStatistics();

        }



        return {


            metrics:
                0

        };


    }





    getAlertSummary() {


        if (

            this.runtime.alertManager

        ) {


            return this.runtime.alertManager
                .getStatistics();

        }



        return {


            alerts:
                0

        };


    }





    refresh() {


        return this.getDashboardState();

    }





    getSnapshot() {


        return this.lastSnapshot;

    }





    getHistory() {


        return this.history;

    }





    recordEvent(

        event

    ) {


        this.history.push({

            event,


            timestamp:

                new Date()

        });


    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            connected:

                Boolean(
                    this.runtime
                ),


            snapshotAvailable:

                Boolean(
                    this.lastSnapshot
                )


        };


    }





    shutdown() {


        this.status =
            "SHUTDOWN";



        this.recordEvent({

            type:
                "DASHBOARD_BRIDGE_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }


}



module.exports =
    MonitoringDashboardBridge;
``
