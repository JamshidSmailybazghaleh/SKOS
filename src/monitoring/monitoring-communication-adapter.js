/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Monitoring Communication Adapter
 * File      : monitoring-communication-adapter.js
 *
 * Build     : BUILD-000807.1
 * Version   : 1.0.0
 *
 * Mission:
 * Connect communication events with
 * SKOS monitoring services.
 *
 * ==========================================================
 */


class MonitoringCommunicationAdapter {


    constructor(options = {}) {


        this.name =
            "Monitoring Communication Adapter";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.metricsCollector =
            options.metricsCollector || null;


        this.healthMonitor =
            options.healthMonitor || null;


        this.alertManager =
            options.alertManager || null;


        this.communicationHistory =
            options.communicationHistory || null;


        this.events =
            [];


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory(

            "ADAPTER_INITIALIZED"

        );


        return true;

    }





    processEvent(

        event

    ) {


        if (!event) {


            throw new Error(

                "Event required."

            );

        }



        this.events.push(

            event

        );



        this.recordHistory(

            "EVENT_PROCESSED",

            event

        );



        if (

            this.communicationHistory

        ) {


            this.communicationHistory.addRecord(

                "MONITORING_ADAPTER",

                event.type ||
                    "UNKNOWN_EVENT",

                event

            );

        }





        if (

            this.metricsCollector

        ) {


            this.metricsCollector.record(

                "COMMUNICATION_EVENTS",

                1

            );

        }



        return {


            processed:
                true,


            event

        };

    }





    monitorComponent(

        componentId,

        state,

        details = {}

    ) {


        if (

            !this.healthMonitor

        ) {


            return false;

        }



        return this.healthMonitor.updateHealth(

            componentId,

            state,

            details

        );

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





    getEvents() {


        return this.events;

    }





    getHistory() {


        return this.history;

    }





    getStatistics() {


        return {


            events:

                this.events.length,


            history:

                this.history.length,


            monitoringConnected:

                Boolean(

                    this.healthMonitor

                ),


            metricsConnected:

                Boolean(

                    this.metricsCollector

                ),


            alertsConnected:

                Boolean(

                    this.alertManager

                )

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


            events:

                this.events.length

        };

    }





    recordHistory(

        event,

        data = {}

    ) {


        this.history.push({

            event,


            data,


            timestamp:

                new Date()

        });

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordHistory(

            "ADAPTER_SHUTDOWN"

        );


        return true;

    }


}



module.exports =
    MonitoringCommunicationAdapter;
