/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-evolution-engine.js
 *
 * Build       : BUILD-000390
 * Version     : 1.0.0
 *
 * Mission:
 * Manage long-term evolution,
 * generations and historical changes
 * of Knowledge Graph.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphEvolutionEngine {


    constructor(options = {}) {


        this.name =
            "Graph Evolution Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.generations =
            [];


        this.currentGeneration =
            0;


        this.changes =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_EVOLUTION_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Create new graph generation
     */


    evolve(graph, metadata = {}) {


        if (

            !graph ||

            !graph.nodes ||

            !graph.edges

        ) {


            throw new Error(

                "Invalid graph."

            );

        }



        this.currentGeneration++;



        const generation = {


            id:

                `GEN-${this.currentGeneration}`,


            version:

                this.currentGeneration,


            nodes:

                graph.nodes.length,


            relations:

                graph.edges.length,


            metadata,


            createdAt:

                new Date()

        };



        this.generations.push(

            generation

        );



        this.recordEvent(

            "GRAPH_EVOLUTION_CREATED",

            generation

        );



        this.updateMetric(

            "graphGenerations"

        );



        return generation;

    }





    /**
     * Register evolution change
     */


    addChange(change) {


        const evolutionChange = {


            id:

                `CHANGE-${this.changes.length + 1}`,


            ...change,


            createdAt:

                new Date()

        };



        this.changes.push(

            evolutionChange

        );


        return evolutionChange;

    }





    /**
     * Get latest generation
     */


    getLatestGeneration() {


        if (

            this.generations.length === 0

        ) {


            return null;

        }



        return this.generations[

            this.generations.length - 1

        ];

    }





    /**
     * Compare generations
     */


    compareGenerations(

        first,

        second

    ) {


        const g1 =

            this.generations.find(

                item =>

                    item.id === first

            );



        const g2 =

            this.generations.find(

                item =>

                    item.id === second

            );



        if (

            !g1 ||

            !g2

        ) {


            throw new Error(

                "Generation not found."

            );

        }



        return {


            nodeDifference:

                g2.nodes -

                g1.nodes,


            relationDifference:

                g2.relations -

                g1.relations


        };

    }





    /**
     * Evolution history
     */


    getHistory() {


        return this.generations;

    }





    getChanges() {


        return this.changes;

    }





    clearHistory() {


        this.generations = [];


        this.changes = [];


        this.currentGeneration = 0;



        return true;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            generations:

                this.generations.length,


            changes:

                this.changes.length,


            currentGeneration:

                this.currentGeneration


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


            generations:

                this.generations.length,


            currentGeneration:

                this.currentGeneration


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

            "GRAPH_EVOLUTION_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphEvolutionEngine;
