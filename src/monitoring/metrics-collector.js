/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component   : Metrics Collector
 * File        : metrics-collector.js
 *
 * Build       : BUILD-000800.6
 * Version     : 2.0.0
 *
 * Mission:
 * Collect, aggregate, analyze and expose
 * operational metrics across SKOS Runtime.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class MetricsCollector {


    constructor(options = {}) {


        this.name =
            "Metrics Collector";


        this.version =
            "2.0.0";


        this.status =
            "CREATED";


        this.maxSamples =
            options.maxSamples || 1000;


        this.metrics =
            new Map();


        this.events =
            [];


        this.collectionInterval =
            null;


    }



    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(
            "METRICS_INITIALIZED"
        );


        return true;

    }



    execute(context = {}) {


        if (context.runtimeStatus) {


            this.record(

                "runtime.status",

                context.runtimeStatus

            );


        }


        if (context.engineCount) {


            this.record(

                "runtime.engines",

                context.engineCount

            );


        }


        if (context.knowledgeObjects !== undefined) {


            this.record(

                "knowledge.objects",

                context.knowledgeObjects

            );


        }


        this.status =
            "READY";


        return true;

    }



    registerMetric(
        metricName,
        metadata = {}
    ) {


        if (!metricName) {

            throw new Error(
                "Metric name required."
            );

        }



        if (!this.metrics.has(metricName)) {


            this.metrics.set(

                metricName,

                {

                    metadata,

                    samples: []

                }

            );


            this.recordEvent(

                "METRIC_REGISTERED"

            );

        }



        return true;

    }




    record(
        metricName,
        value
    ) {


        if (!this.metrics.has(metricName)) {


            this.registerMetric(metricName);


        }



        const metric =
            this.metrics.get(metricName);



        metric.samples.push({

            value,

            timestamp:
                new Date()

        });



        if (

            metric.samples.length >
            this.maxSamples

        ) {


            metric.samples.shift();


            this.recordEvent(

                "METRIC_SAMPLE_LIMIT_REACHED"

            );


        }



        return true;

    }




    collect(metricName, value) {


        return this.record(
            metricName,
            value
        );

    }




    getMetric(metricName) {


        return this.metrics.get(metricName);

    }




    getMetricValues(metricName) {


        const metric =
            this.metrics.get(metricName);



        if (!metric) {

            return [];

        }



        return metric.samples.map(

            sample =>
                sample.value

        );

    }




    calculateAverage(metricName) {


        const values =
            this.getMetricValues(metricName);



        if (!values.length) {

            return 0;

        }



        return (

            values.reduce(

                (sum, value) =>
                    sum + value,

                0

            )

        ) / values.length;

    }




    calculateMinimum(metricName) {


        const values =
            this.getMetricValues(metricName);


        return values.length
            ? Math.min(...values)
            : 0;

    }




    calculateMaximum(metricName) {


        const values =
            this.getMetricValues(metricName);


        return values.length
            ? Math.max(...values)
            : 0;

    }




    calculateLatest(metricName) {


        const metric =
            this.metrics.get(metricName);



        if (

            !metric ||
            metric.samples.length === 0

        ) {

            return null;

        }



        return metric.samples[
            metric.samples.length - 1
        ];

    }




    recordEvent(type, data = {}) {


        this.events.push({

            type,

            data,

            timestamp:
                new Date()

        });


    }




    getEvents() {


        return this.events;

    }




    getStatistics() {


        return {


            registeredMetrics:
                this.metrics.size,


            totalSamples:

                Array.from(
                    this.metrics.values()
                )

                .reduce(

                    (sum, metric) =>
                        sum +
                        metric.samples.length,

                    0

                ),


            events:
                this.events.length


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


            metrics:
                this.metrics.size,


            samples:
                this.getStatistics()
                    .totalSamples,


            events:
                this.events.length


        };


    }




    shutdown() {


        if (this.collectionInterval) {


            clearInterval(
                this.collectionInterval
            );


        }



        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "METRICS_SHUTDOWN"

        );



        return true;

    }

}



module.exports =
    MetricsCollector;
