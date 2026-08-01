/**
 * SKOS Monitoring Engine
 *
 * ENG-MON-001
 * BUILD-000001
 */


class MonitoringEngine {


    constructor() {

        this.name =
            "Monitoring Engine";

        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.events = [];


        this.metrics = {

            objectsReceived: 0

        };

    }



    initialize() {

        this.status =
            "INITIALIZED";


        return {

            status:
                this.status

        };

    }



    recordEvent(eventName) {


        this.events.push({

            name:
                eventName,

            timestamp:
                new Date()

        });


        return true;

    }




    updateMetric(metricName) {


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


            status:
                this.status,


            metrics:
                this.metrics,


            events:
                this.events.length

        };

    }


}



module.exports =
    MonitoringEngine;
