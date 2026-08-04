/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Runtime
 * File      : monitoring-runtime.js
 *
 * Build     : BUILD-000808.2
 * Version   : 2.0.0
 *
 * Mission:
 * Unified monitoring orchestration layer
 * for SKOS operational intelligence.
 *
 * ==========================================================
 */


class MonitoringRuntime {


    constructor(options = {}) {


        this.name =
            "SKOS Monitoring Runtime";


        this.version =
            "2.0.0";


        this.status =
            "CREATED";


        // Legacy monitor registry

        this.monitors =
            [];



        // Runtime storage

        this.metrics =
            {};

        this.events =
            [];

        this.history =
            [];

        this.startedAt =
            null;



        // SKOS Monitoring Services

        this.metricsCollector =
            options.metricsCollector || null;


        this.healthMonitor =
            options.healthMonitor || null;


        this.alertManager =
            options.alertManager || null;


        this.communicationAdapter =
            options.communicationAdapter || null;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent({

            type:
                "MONITORING_INITIALIZED",

            timestamp:
                new Date()

        });


        return true;

    }





    registerMonitor(

        monitor

    ) {


        if (!monitor) {


            throw new Error(

                "Monitor is required."

            );

        }



        this.monitors.push(

            monitor

        );


        return true;

    }





    async start() {


        if (

            this.status === "CREATED"

        ) {


            this.initialize();

        }



        this.status =
            "STARTING";


        this.startedAt =
            new Date();




        for (

            const monitor of this.monitors

        ) {


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


        for (

            const monitor of this.monitors

        ) {


            if (

                typeof monitor.collect === "function"

            ) {


                const data =

                    await monitor.collect();



                this.metrics[

                    monitor.name

                ] = data;



                if (

                    this.metricsCollector

                ) {


                    this.metricsCollector.record(

                        monitor.name,

                        data

                    );

                }


            }

        }



        return this.metrics;

    }





    async healthCheck() {


        const result =
            [];



        for (

            const monitor of this.monitors

        ) {


            if (

                typeof monitor.health === "function"

            ) {


                const health = {


                    name:
                        monitor.name,


                    status:
                        await monitor.health()


                };



                result.push(

                    health

                );


            }

        }



        return result;

    }





    processEvent(

        event

    ) {


        if (

            this.communicationAdapter

        ) {


            return this.communicationAdapter.processEvent(

                event

            );

        }



        this.recordEvent(

            event

        );


        return true;

    }





    createAlert(

        severity,

        message,

        metadata = {}

    ) {


        if (

            !this.alertManager

        ) {


            return false;

        }



        return this.alertManager.createAlert(

            severity,

            message,

            metadata

        );

    }





    generateOperationalReport() {


        return {


            timestamp:

                new Date(),



            runtime:

                this.getStatus(),



            metrics:

                this.metricsCollector

                ?

                this.metricsCollector.getStatistics()

                :

                null,



            health:

                this.healthMonitor

                ?

                this.healthMonitor.getStatistics()

                :

                null,



            alerts:

                this.alertManager

                ?

                this.alertManager.getStatistics()

                :

                null,


            events:

                this.events.length


        };

    }





    recordEvent(

        event

    ) {


        this.events.push(

            event

        );


        this.history.push({

            event,

            timestamp:

                new Date()

        });


        return true;

    }





    getEvents() {


        return this.events;

    }





    getMetrics() {


        return this.metrics;

    }





    getHistory() {


        return this.history;

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

                Object.keys(

                    this.metrics

                ).length,


            events:

                this.events.length,


            startedAt:

                this.startedAt


        };

    }





    async shutdown() {



        for (

            const monitor of this.monitors

        ) {


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


}


module.exports =
    MonitoringRuntime;
