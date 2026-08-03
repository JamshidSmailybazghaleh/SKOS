/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-pattern-detector.js
 *
 * Build       : BUILD-000382
 * Version     : 1.0.0
 *
 * Mission:
 * Detect hidden structural patterns
 * inside Knowledge Graph.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphPatternDetector {


    constructor(options = {}) {


        this.name =
            "Graph Pattern Detector";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.patterns =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_PATTERN_DETECTOR_INITIALIZED"

        );


        return true;

    }





    /**
     * Detect patterns in graph
     */


    detect(graph) {


        if (

            !graph ||

            !graph.nodes ||

            !graph.edges

        ) {


            throw new Error(

                "Invalid graph."

            );

        }



        this.patterns = [];



        this.detectClusters(

            graph

        );


        this.detectChains(

            graph

        );


        this.detectCycles(

            graph

        );



        this.recordEvent(

            "GRAPH_PATTERNS_DETECTED",

            {

                count:

                    this.patterns.length

            }

        );


        this.updateMetric(

            "patternsDetected"

        );



        return this.patterns;

    }





    /**
     * Detect connected clusters
     */


    detectClusters(graph) {


        const connections = {};



        graph.edges.forEach(

            edge => {


                connections[edge.from] =

                    connections[edge.from] || [];



                connections[edge.from].push(

                    edge.to

                );


            }

        );



        Object.keys(

            connections

        ).forEach(

            node => {


                if (

                    connections[node].length > 1

                ) {


                    this.patterns.push(

                        {

                            type:

                                "CLUSTER",


                            node,


                            connections:

                                connections[node]

                        }

                    );

                }


            }

        );


    }





    /**
     * Detect relationship chains
     */


    detectChains(graph) {


        graph.edges.forEach(

            first => {


                graph.edges.forEach(

                    second => {


                        if (

                            first.to === second.from

                        ) {


                            this.patterns.push(

                                {

                                    type:

                                        "CHAIN",


                                    path:

                                        [

                                            first.from,

                                            first.to,

                                            second.to

                                        ]

                                }

                            );

                        }


                    }

                );


            }

        );


    }





    /**
     * Detect circular relations
     */


    detectCycles(graph) {


        graph.edges.forEach(

            edge => {


                const exists =

                    graph.edges.some(

                        candidate =>


                            candidate.from === edge.to

                            &&

                            candidate.to === edge.from


                    );



                if (

                    exists

                ) {


                    this.patterns.push(

                        {

                            type:

                                "CYCLE",


                            relation:

                                edge

                        }

                    );

                }


            }

        );


    }





    /**
     * Add custom detected pattern
     */


    addPattern(pattern) {


        this.patterns.push(

            pattern

        );


        return pattern;

    }





    /**
     * Get patterns
     */


    getPatterns() {


        return this.patterns;

    }





    clearPatterns() {


        this.patterns = [];


        return true;

    }





    getStatistics() {


        return {


            total:

                this.patterns.length,


            clusters:

                this.patterns.filter(

                    p =>

                        p.type ===

                        "CLUSTER"

                ).length,


            chains:

                this.patterns.filter(

                    p =>

                        p.type ===

                        "CHAIN"

                ).length,


            cycles:

                this.patterns.filter(

                    p =>

                        p.type ===

                        "CYCLE"

                ).length


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


            patterns:

                this.patterns.length


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

            "GRAPH_PATTERN_DETECTOR_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphPatternDetector;
