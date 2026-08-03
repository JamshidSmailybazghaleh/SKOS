/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-learning-engine.js
 *
 * Build       : BUILD-000386
 * Version     : 1.0.0
 *
 * Mission:
 * Learn from graph evolution,
 * behaviors and discovered patterns.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphLearningEngine {


    constructor(options = {}) {


        this.name =
            "Graph Learning Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.learningEvents =
            [];


        this.models =
            new Map();


        this.counter =
            0;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_LEARNING_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Learn from graph observation
     */


    learn(graph) {


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



        const learning = {


            id:

                `LEARN-${this.counter}`,


            nodes:

                graph.nodes.length,


            relations:

                graph.edges.length,


            patterns:

                this.extractFeatures(

                    graph

                ),


            createdAt:

                new Date()

        };



        this.learningEvents.push(

            learning

        );



        this.recordEvent(

            "GRAPH_LEARNING_COMPLETED",

            {

                id:

                    learning.id

            }

        );


        this.updateMetric(

            "learningCycles"

        );



        return learning;

    }





    /**
     * Extract graph features
     */


    extractFeatures(graph) {


        return {


            density:

                this.calculateDensity(

                    graph

                ),


            nodeCount:

                graph.nodes.length,


            edgeCount:

                graph.edges.length,


            relationTypes:

                [

                    ...

                    new Set(

                        graph.edges.map(

                            edge =>

                                edge.type

                        )

                    )

                ]


        };

    }





    /**
     * Calculate graph density
     */


    calculateDensity(graph) {


        const nodes =

            graph.nodes.length;



        if (

            nodes <= 1

        ) {


            return 0;

        }



        const possible =

            nodes *

            (

                nodes - 1

            );



        return (

            graph.edges.length

            /

            possible

        );

    }





    /**
     * Store learned model
     */


    registerModel(

        name,

        model

    ) {


        this.models.set(

            name,

            model

        );


        return {


            name,

            model

        };

    }





    /**
     * Retrieve model
     */


    getModel(name) {


        return (

            this.models.get(

                name

            )

            ||

            null

        );

    }





    /**
     * Learning history
     */


    getLearningHistory() {


        return this.learningEvents;

    }





    clearLearningHistory() {


        this.learningEvents = [];


        return true;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            learningCycles:

                this.learningEvents.length,


            models:

                this.models.size


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


            learningCycles:

                this.learningEvents.length,


            models:

                this.models.size


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

            "GRAPH_LEARNING_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphLearningEngine;
