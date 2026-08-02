/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine : Monitoring Engine
 *
 * Build  : BUILD-000006
 * Version: 1.1.0
 *
 * Status : Event Query Supported
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class MonitoringEngine {


    constructor() {


        this.name =
            "Monitoring Engine";


        this.version =
            "1.1.0";


        this.status =
            "CREATED";



        this.events = [];



        this.metrics = {


            objectsReceived: 0,

            pipelinesStarted: 0,

            pipelinesCompleted: 0,

            pipelinesFailed: 0,

            sdkcObjectsStored: 0,

            sdkcObjectsRetrieved: 0,

            sdkcObjectsRemoved: 0


        };


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "MONITORING_ENGINE_INITIALIZED"

        );


        return {


            status:
                this.status


        };


    }






    recordEvent(

        eventName,

        metadata = {}

    ) {



        const event = {


            name:

                eventName,


            metadata:

                metadata,


            timestamp:

                new Date()


        };



        this.events.push(event);



        return true;


    }






    /**
     * NEW
     * Return monitoring history
     */


    getEvents() {


        return [

            ...this.events

        ];


    }







    updateMetric(

        metricName

    ) {



        if (

            !this.metrics[metricName]

        ) {


            this.metrics[metricName] = 0;


        }



        this.metrics[metricName]++;



        return this.metrics[metricName];


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








    getHealth() {


        return {


            status:

                this.status,


            metrics:

                this.metrics


        };


    }







    getDashboard() {


        return {


            system:

                "SKOS",


            engine:

                this.name,


            version:

                this.version,


            status:

                this.status,


            metrics:

                this.metrics,


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



module.exports =
    MonitoringEngine;
