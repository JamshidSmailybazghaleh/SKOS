/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine    : Monitoring Engine
 * Module    : Runtime Monitoring
 *
 * File ID  : ENG-MON-001
 *
 * Build    : BUILD-000006
 * Sprint   : Sprint 02
 * Version  : 1.1.0
 *
 * Status   : Advanced Monitoring Enabled
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


            documentsParsed: 0,


            metadataExtracted: 0,


            knowledgeObjectsCreated: 0,


            totalEvents: 0


        };



        this.startTime =
            null;


    }




    /**
     * Initialize Monitoring Engine
     */

    initialize() {


        this.status =
            "INITIALIZED";


        this.startTime =
            new Date();



        this.recordEvent(

            "MONITORING_ENGINE_INITIALIZED"

        );



        return {


            status:
                this.status

        };


    }






    /**
     * Register Monitoring Event
     */

    recordEvent(

        eventName,

        details = {}

    ) {



        const event = {


            name:
                eventName,


            details,


            timestamp:
                new Date()

        };



        this.events.push(

            event

        );



        this.metrics.totalEvents++;



        return true;


    }







    /**
     * Update Metric Counter
     */

    updateMetric(

        metricName,

        value = 1

    ) {



        if (

            typeof this.metrics[metricName]
            !== "number"

        ) {


            this.metrics[metricName] = 0;


        }



        this.metrics[metricName]
            += value;



        return this.metrics[metricName];


    }







    /**
     * Increment received objects
     */

    objectReceived() {


        this.updateMetric(

            "objectsReceived"

        );



        this.recordEvent(

            "OBJECT_RECEIVED"

        );


    }







    /**
     * Pipeline Started
     */

    pipelineStarted(

        metadata = {}

    ) {


        this.updateMetric(

            "pipelinesStarted"

        );



        this.recordEvent(

            "INTAKE_PIPELINE_STARTED",

            metadata

        );


    }







    /**
     * Pipeline Completed
     */

    pipelineCompleted(

        metadata = {}

    ) {


        this.updateMetric(

            "pipelinesCompleted"

        );



        this.recordEvent(

            "INTAKE_PIPELINE_COMPLETED",

            metadata

        );


    }







    /**
     * Pipeline Failed
     */

    pipelineFailed(

        error

    ) {


        this.updateMetric(

            "pipelinesFailed"

        );



        this.recordEvent(

            "INTAKE_PIPELINE_FAILED",

            {

                error:

                    error instanceof Error

                    ?

                    error.message

                    :

                    String(error)

            }

        );


    }







    /**
     * Get Engine Status
     */

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







    /**
     * Health Report
     */

    getHealth() {


        return {


            status:
                this.status,


            uptime:

                this.startTime

                ?

                Date.now()
                -
                this.startTime.getTime()

                :

                0,



            metrics:

                this.metrics


        };


    }







    /**
     * Monitoring Dashboard
     */

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







    /**
     * Shutdown
     */

    shutdown() {


        this.recordEvent(

            "MONITORING_ENGINE_SHUTDOWN"

        );



        this.status =
            "SHUTDOWN";



        return true;


    }


}



module.exports =
    MonitoringEngine;
