/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-performance-monitor.js
 *
 * Build       : BUILD-000368
 * Version     : 1.0.0
 *
 * Mission:
 * Monitor Knowledge Graph performance,
 * query speed, traversal depth,
 * storage operations and optimization metrics.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphPerformanceMonitor {


    constructor(options = {}) {


        this.name =
            "Graph Performance Monitor";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.metrics = {


            queries:

                0,


            traversals:

                0,


            storageReads:

                0,


            storageWrites:

                0,


            cacheHits:

                0,


            cacheMisses:

                0,


            optimizationRuns:

                0,


            totalQueryTime:

                0,


            totalTraversalTime:

                0


        };


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_PERFORMANCE_MONITOR_INITIALIZED"

        );


        return true;

    }





    /**
     * Start measurement
     */


    startTimer(operation) {


        return {


            operation,


            start:

                Date.now()


        };

    }





    /**
     * End measurement
     */


    endTimer(timer) {


        const duration =

            Date.now()

            -

            timer.start;



        this.history.push(

            {

                operation:

                    timer.operation,


                duration,


                timestamp:

                    new Date()

            }

        );


        return duration;

    }





    /**
     * Register Query Performance
     */


    recordQuery(

        duration

    ) {


        this.metrics.queries++;


        this.metrics.totalQueryTime +=

            duration;



        this.recordEvent(

            "GRAPH_QUERY_MEASURED",

            {

                duration

            }

        );


        return duration;

    }





    /**
     * Register Traversal Performance
     */


    recordTraversal(

        duration,

        depth = 0

    ) {


        this.metrics.traversals++;


        this.metrics.totalTraversalTime +=

            duration;



        this.recordEvent(

            "GRAPH_TRAVERSAL_MEASURED",

            {

                duration,

                depth

            }

        );


        return duration;

    }





    recordStorageRead() {


        this.metrics.storageReads++;


    }





    recordStorageWrite() {


        this.metrics.storageWrites++;


    }





    recordCacheHit() {


        this.metrics.cacheHits++;


    }





    recordCacheMiss() {


        this.metrics.cacheMisses++;


    }





    recordOptimization() {


        this.metrics.optimizationRuns++;


    }





    /**
     * Average Query Time
     */


    getAverageQueryTime() {


        if (

            this.metrics.queries === 0

        ) {

            return 0;

        }


        return (

            this.metrics.totalQueryTime

            /

            this.metrics.queries

        );

    }





    /**
     * Average Traversal Time
     */


    getAverageTraversalTime() {


        if (

            this.metrics.traversals === 0

        ) {

            return 0;

        }


        return (

            this.metrics.totalTraversalTime

            /

            this.metrics.traversals

        );

    }





    /**
     * Cache Efficiency
     */


    getCacheEfficiency() {


        const total =

            this.metrics.cacheHits

            +

            this.metrics.cacheMisses;



        if (

            total === 0

        ) {

            return 0;

        }



        return (

            this.metrics.cacheHits

            /

            total

        ) * 100;

    }





    /**
     * Performance Dashboard
     */


    getDashboard() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            metrics:

                this.metrics,


            averages:

                {

                    queryTime:

                        this.getAverageQueryTime(),


                    traversalTime:

                        this.getAverageTraversalTime()


                },


            cacheEfficiency:

                this.getCacheEfficiency(),


            historySize:

                this.history.length


        };

    }





    recordEvent(

        event,

        metadata = {}

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.updateMetric(

                metric

            );

        }

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "GRAPH_PERFORMANCE_MONITOR_SHUTDOWN"

        );


        return true;

    }


}


module.exports =

    GraphPerformanceMonitor;
