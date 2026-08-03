/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-optimizer.js
 *
 * Build       : BUILD-000367
 * Version     : 1.0.0
 *
 * Mission:
 * Optimize Knowledge Graph structure,
 * reduce redundancy and improve traversal performance.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphOptimizer {


    constructor(options = {}) {


        this.name =
            "Graph Optimizer";


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

            "GRAPH_OPTIMIZER_INITIALIZED"

        );


        return true;

    }





    /**
     * Optimize complete graph
     */


    optimize(graph) {


        if (
            !graph ||
            !graph.nodes ||
            !graph.edges
        ) {

            throw new Error(

                "Invalid graph structure."

            );

        }



        const optimized = {


            nodes:

                this.removeDuplicateNodes(

                    graph.nodes

                ),


            edges:

                this.removeDuplicateEdges(

                    graph.edges

                )

        };



        this.recordEvent(

            "GRAPH_OPTIMIZATION_COMPLETED",

            {

                beforeNodes:
                    graph.nodes.length,


                afterNodes:
                    optimized.nodes.length,


                beforeEdges:
                    graph.edges.length,


                afterEdges:
                    optimized.edges.length

            }

        );


        this.updateMetric(

            "graphsOptimized"

        );


        return optimized;


    }





    /**
     * Remove duplicate nodes
     */


    removeDuplicateNodes(nodes) {


        const map =
            new Map();



        for (
            const node of nodes
        ) {


            if (
                node &&
                node.id
            ) {


                if (
                    !map.has(node.id)
                ) {


                    map.set(

                        node.id,

                        node

                    );

                }

            }

        }


        return Array.from(

            map.values()

        );

    }





    /**
     * Remove duplicate relationships
     */


    removeDuplicateEdges(edges) {


        const unique =
            new Map();



        for (
            const edge of edges
        ) {


            const key =

                `${edge.from}-${edge.to}-${edge.type}`;



            if (
                !unique.has(key)
            ) {


                unique.set(

                    key,

                    edge

                );

            }


        }


        return Array.from(

            unique.values()

        );

    }





    /**
     * Find isolated nodes
     */


    findIsolatedNodes(graph) {


        const connected =
            new Set();



        for (
            const edge of graph.edges
        ) {


            connected.add(
                edge.from
            );


            connected.add(
                edge.to
            );

        }



        return graph.nodes.filter(

            node =>

                !connected.has(

                    node.id

                )

        );

    }





    /**
     * Calculate optimization report
     */


    getOptimizationReport(

        original,

        optimized

    ) {


        return {


            nodesRemoved:

                original.nodes.length -

                optimized.nodes.length,


            edgesRemoved:

                original.edges.length -

                optimized.edges.length,


            improvement:

                {

                    nodeReduction:

                        this.calculateReduction(

                            original.nodes.length,

                            optimized.nodes.length

                        ),


                    edgeReduction:

                        this.calculateReduction(

                            original.edges.length,

                            optimized.edges.length

                        )

                }


        };

    }





    calculateReduction(

        before,

        after

    ) {


        if (
            before === 0
        ) {

            return 0;

        }


        return (

            (

                (before - after)

                /

                before

            )

            *

            100

        ).toFixed(2);


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

            "GRAPH_OPTIMIZER_SHUTDOWN"

        );


        return true;

    }


}


module.exports =

    GraphOptimizer;
