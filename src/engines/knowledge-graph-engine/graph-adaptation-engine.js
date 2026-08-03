/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-adaptation-engine.js
 *
 * Build       : BUILD-000388
 * Version     : 1.0.0
 *
 * Mission:
 * Adapt and optimize Knowledge Graph
 * structure based on learning insights.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphAdaptationEngine {


    constructor(options = {}) {


        this.name =
            "Graph Adaptation Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.adaptations =
            [];


        this.counter =
            0;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_ADAPTATION_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Adapt graph based on learning result
     */


    adapt(graph, learning = {}) {


        if (

            !graph ||

            !graph.nodes ||

            !graph.edges

        ) {


            throw new Error(

                "Invalid graph."

            );

        }



        this.counter++;



        const adaptation = {


            id:

                `ADAPT-${this.counter}`,


            timestamp:

                new Date(),


            changes:

                [],


            source:

                learning.id || null

        };





        this.optimizeRelations(

            graph,

            adaptation

        );



        this.optimizeNodes(

            graph,

            adaptation

        );



        this.adaptations.push(

            adaptation

        );



        this.recordEvent(

            "GRAPH_ADAPTATION_COMPLETED",

            {

                id:

                    adaptation.id

            }

        );



        this.updateMetric(

            "adaptationCycles"

        );



        return adaptation;

    }





    /**
     * Optimize graph relationships
     */


    optimizeRelations(

        graph,

        adaptation

    ) {


        const seen =

            new Set();



        graph.edges =

            graph.edges.filter(

                edge => {


                    const key =

                        `${edge.from}:${edge.to}:${edge.type}`;



                    if (

                        seen.has(key)

                    ) {


                        adaptation.changes.push(

                            {

                                type:

                                    "REMOVE_DUPLICATE_RELATION",


                                relation:

                                    edge

                            }

                        );



                        return false;

                    }



                    seen.add(key);



                    return true;


                }

            );


    }





    /**
     * Optimize isolated nodes
     */


    optimizeNodes(

        graph,

        adaptation

    ) {


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



        graph.nodes.forEach(

            node => {


                if (

                    !connected.has(

                        node.id

                    )

                ) {


                    adaptation.changes.push(

                        {

                            type:

                                "ISOLATED_NODE_DETECTED",


                            node:

                                node.id

                        }

                    );

                }


            }

        );


    }





    /**
     * Register custom adaptation
     */


    addAdaptation(

        adaptation

    ) {


        this.adaptations.push(

            adaptation

        );


        return adaptation;

    }





    /**
     * Return adaptation history
     */


    getAdaptations() {


        return this.adaptations;

    }





    clearAdaptations() {


        this.adaptations = [];


        return true;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            total:

                this.adaptations.length,


            totalChanges:

                this.adaptations.reduce(

                    (sum, item) =>

                        sum +

                        item.changes.length,

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


            adaptations:

                this.adaptations.length


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

            "GRAPH_ADAPTATION_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphAdaptationEngine;
