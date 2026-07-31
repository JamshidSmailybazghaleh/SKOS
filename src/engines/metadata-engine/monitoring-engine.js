/**
 * SKOS Monitoring Engine
 *
 * File ID:
 * ENG-MON-001
 *
 * Version:
 * 1.0.0
 *
 * Build:
 * BUILD-000001
 */


class MonitoringEngine {


    constructor(options = {}) {


        this.logger =
            options.logger || null;


        this.status =
            "CREATED";


        this.events = [];


        this.metrics = {

            objectsReceived: 0,

            objectsProcessed: 0,

            errors: 0

        };


    }



    /**
     * Initialize Monitoring
     */

    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(
            "MONITORING_STARTED"
        );


        return true;

    }



    /**
     * Record System Event
     */

    recordEvent(
        event,
        metadata={}
    ){


        const record = {


            event,


            metadata,


            timestamp:
            new Date()
            .toISOString()


        };



        this.events.push(
            record
        );



        if(this.logger){

            this.logger.info(
                event,
                metadata
            );

        }



        return record;

    }



    /**
     * Update Metrics
     */

    updateMetric(
        name,
        value=1
    ){


        if(
            this.metrics[name]
            !== undefined
        ){

            this.metrics[name]
            += value;

        }



        return this.metrics;

    }



    /**
     * Health Check
     */

    getHealth(){


        return {


            status:
            this.status ===
            "INITIALIZED"
            ?
            "ONLINE"
            :
            "OFFLINE",


            metrics:
            this.metrics,


            events:
            this.events.length


        };


    }



    /**
     * Dashboard Data
     */

    getDashboard(){


        return {


            system:
            "SKOS",


            status:
            this.getHealth(),


            recentEvents:
            this.events.slice(-10)


        };


    }



    /**
     * Engine Status
     */

    getStatus(){


        return {

            status:
            this.status,


            events:
            this.events.length,


            metrics:
            this.metrics


        };


    }



    /**
     * Shutdown
     */

    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(
            "MONITORING_STOPPED"
        );


        return true;

    }


}



module.exports = MonitoringEngine;
