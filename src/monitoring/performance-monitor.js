/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Performance Monitor
 * File      : performance-monitor.js
 *
 * Build     : BUILD-000442
 * Version   : 1.0.0
 *
 * Mission:
 * Measure execution performance, latency,
 * throughput, runtime efficiency and resource usage.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

class PerformanceMonitor {

    constructor(options = {}) {

        this.name = "Performance Monitor";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.operations = new Map();
        this.measurements = [];
        this.statistics = new Map();

        this.options = options;
    }



    initialize() {

        this.status = "INITIALIZED";

        return true;

    }



    start(operationId) {

        if (!operationId) {

            throw new Error(
                "Operation id required."
            );

        }

        this.operations.set(

            operationId,

            {

                startedAt:

                    process.hrtime.bigint()

            }

        );

        return true;

    }



    stop(
        operationId
    ) {

        const operation =

            this.operations.get(
                operationId
            );

        if (!operation) {

            throw new Error(
                "Operation not started."
            );

        }

        const finished =

            process.hrtime.bigint();

        const durationNs =

            Number(
                finished - operation.startedAt
            );

        const durationMs =

            durationNs / 1000000;

        const record = {

            operationId,

            durationMs,

            timestamp:
                new Date()

        };

        this.measurements.push(record);

        this.operations.delete(
            operationId
        );

        return record;

    }



    record(
        operationId,
        durationMs
    ) {

        this.measurements.push({

            operationId,

            durationMs,

            timestamp:
                new Date()

        });

        return true;

    }



    getMeasurements() {

        return this.measurements;

    }



    getOperationHistory(
        operationId
    ) {

        return this.measurements.filter(

            item =>

                item.operationId ===
                operationId

        );

    }



    calculateAverage(
        operationId
    ) {

        const history =

            this.getOperationHistory(
                operationId
            );

        if (
            history.length === 0
        ) {

            return 0;

        }

        const total =

            history.reduce(

                (sum, item) =>

                    sum + item.durationMs,

                0

            );

        return total / history.length;

    }



    calculateMinimum(
        operationId
    ) {

        const history =

            this.getOperationHistory(
                operationId
            );

        if (
            history.length === 0
        ) {

            return 0;

        }

        return Math.min(

            ...history.map(

                item => item.durationMs

            )

        );

    }



    calculateMaximum(
        operationId
    ) {

        const history =

            this.getOperationHistory(
                operationId
            );

        if (
            history.length === 0
        ) {

            return 0;

        }

        return Math.max(

            ...history.map(

                item => item.durationMs

            )

        );

    }



    calculateThroughput(
        operations,
        seconds
    ) {

        if (
            seconds <= 0
        ) {

            return 0;

        }

        return operations / seconds;

    }



    registerStatistic(
        key,
        value
    ) {

        this.statistics.set(

            key,

            value

        );

        return true;

    }



    getStatistic(
        key
    ) {

        return this.statistics.get(
            key
        );

    }



    clear() {

        this.measurements = [];
        this.statistics.clear();

        return true;

    }



    getStatistics() {

        return {

            activeOperations:

                this.operations.size,

            completedMeasurements:

                this.measurements.length,

            storedStatistics:

                this.statistics.size

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

            activeOperations:

                this.operations.size

        };

    }



    shutdown() {

        this.status =
            "SHUTDOWN";

        return true;

    }

}

module.exports =
    PerformanceMonitor;
