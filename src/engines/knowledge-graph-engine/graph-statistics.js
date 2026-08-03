/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-statistics.js
 *
 * Build       : BUILD-000372
 * Version     : 1.0.0
 *
 * Mission:
 * Analyze Knowledge Graph structure,
 * calculate graph metrics and provide
 * intelligence statistics.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphStatistics {


    constructor(options = {}) {


        this.name =
            "Graph Statistics";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_STATISTICS_INITIALIZED"

        );


        return true;

    }





    /**
     * Generate complete statistics
     */


    analyze(graph) {


        if (

            !graph ||

            !graph.nodes ||

            !graph.edges

        ) {

            throw new Error(

                "Invalid graph structure."

            );

        }



        const result = {


            nodes:

                graph.nodes.length,


            edges:

                graph.edges.length,


            density:

                this.calculateDensity(

                    graph

                ),


            averageDegree:

                this.calculateAverageDegree(

                    graph

                ),


            isolatedNodes:

                this.countIsolatedNodes(

                    graph

                ),


            relationTypes:

                this.countRelationTypes(

                    graph

                )


        };



        this.recordEvent(

            "GRAPH_STATISTICS_GENERATED",

            result

        );



        this.updateMetric(

            "statisticsGenerated"

        );



        return result;

    }





    /**
     * Graph density
     *
     * E / N(N-1)
     */


    calculateDensity(graph) {


        const nodes =

            graph.nodes.length;



        if (

            nodes <= 1

        ) {

            return 0;

        }



        return (

            graph.edges.length

            /

            (

                nodes *

                (

                    nodes - 1

                )

            )

        ).toFixed(4);


    }





    /**
     * Average node degree
     */


    calculateAverageDegree(graph) {


        if (

            graph.nodes.length === 0

        ) {

            return 0;

        }



        return (

            (

                graph.edges.length * 2

            )

            /

            graph.nodes.length

        ).toFixed(2);


    }





    /**
     * Count disconnected nodes
     */


    countIsolatedNodes(graph) {


        const connected =

            new Set();



        graph.edges.forEach(

            edge => {


                connected.add(

                    edge.from

                );


                connected.add(

                    edge.to

                );


            }

        );



        return graph.nodes.filter(

            node =>

                !connected.has(

                    node.id

                )

        ).length;


    }





    /**
     * Relation distribution
     */


    countRelationTypes(graph) {


        const types = {};



        graph.edges.forEach(

            edge => {


                if (

                    !types[edge.type]

                ) {


                    types[edge.type] =

                        0;

                }



                types[edge.type]++;


            }

        );



        return types;


    }





    /**
     * Find most connected nodes
     */


    findCentralNodes(graph, limit = 5) {


        const scores =

            {};



        graph.nodes.forEach(

            node => {


                scores[node.id] =

                    0;


            }

        );



        graph.edges.forEach(

            edge => {


                scores[edge.from]++;


                scores[edge.to]++;


            }

        );



        return Object.entries(

            scores

        )

        .sort(

            (a,b) => b[1] - a[1]

        )

        .slice(

            0,

            limit

        );

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status


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

            "GRAPH_STATISTICS_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphStatistics;
