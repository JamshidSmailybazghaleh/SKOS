/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component   : Metrics Collector
 * File        : metrics-collector.js
 *
 * Build       : BUILD-000440
 * Version     : 1.0.0
 *
 * Mission:
 * Collect, aggregate, summarize and expose
 * operational metrics across the SKOS platform.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class MetricsCollector {

    constructor(options = {}) {

        this.name = "Metrics Collector";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.maxSamples =
            options.maxSamples || 1000;

        this.metrics =
            new Map();
    }



    initialize() {

        this.status = "INITIALIZED";

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

        }

        return true;

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

            sample => sample.value

        );

    }



    calculateAverage(metricName) {

        const values =
            this.getMetricValues(metricName);

        if (values.length === 0) {

            return 0;

        }

        const total =

            values.reduce(

                (sum, value) =>

                    sum + value,

                0

            );

        return total / values.length;

    }



    calculateMinimum(metricName) {

        const values =
            this.getMetricValues(metricName);

        if (values.length === 0) {

            return 0;

        }

        return Math.min(...values);

    }



    calculateMaximum(metricName) {

        const values =
            this.getMetricValues(metricName);

        if (values.length === 0) {

            return 0;

        }

        return Math.max(...values);

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



    clearMetric(metricName) {

        if (
            this.metrics.has(metricName)
        ) {

            this.metrics.get(metricName)
                .samples = [];

        }

        return true;

    }



    clearAll() {

        this.metrics.clear();

        return true;

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

                        sum + metric.samples.length,

                    0

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

            metrics:
                this.metrics.size

        };

    }



    shutdown() {

        this.status =
            "SHUTDOWN";

        return true;

    }

}

module.exports =
    MetricsCollector;
