/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-lineage-engine.js
 *
 * Build       : BUILD-000392
 * Version     : 1.0.0
 *
 * Mission:
 * Track origin, transformation and
 * historical lineage of Knowledge Objects.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphLineageEngine {


    constructor(options = {}) {


        this.name =
            "Graph Lineage Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.lineages =
            [];


        this.counter =
            0;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_LINEAGE_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Register Knowledge Object lineage
     */


    registerLineage(

        objectId,

        source,

        metadata = {}

    ) {


        if (

            !objectId

        ) {


            throw new Error(

                "Knowledge Object id required."

            );

        }



        this.counter++;



        const lineage = {


            id:

                `LINEAGE-${this.counter}`,


            objectId,


            source,


            transformations:

                [],


            metadata,


            createdAt:

                new Date()

        };



        this.lineages.push(

            lineage

        );



        this.recordEvent(

            "LINEAGE_CREATED",

            {

                id:

                    lineage.id

            }

        );



        this.updateMetric(

            "lineagesCreated"

        );



        return lineage;

    }





    /**
     * Add transformation history
     */


    addTransformation(

        lineageId,

        transformation

    ) {


        const lineage =

            this.lineages.find(

                item =>

                    item.id === lineageId

            );



        if (

            !lineage

        ) {


            throw new Error(

                "Lineage not found."

            );

        }



        const event = {


            type:

                transformation.type || "UPDATE",


            details:

                transformation.details || {},


            timestamp:

                new Date()

        };



        lineage.transformations.push(

            event

        );



        this.recordEvent(

            "LINEAGE_TRANSFORMATION_ADDED",

            {

                lineageId

            }

        );



        return event;

    }





    /**
     * Retrieve object lineage
     */


    getLineage(

        objectId

    ) {


        return (

            this.lineages.find(

                item =>

                    item.objectId === objectId

            )

            ||

            null

        );

    }





    /**
     * Complete lineage graph
     */


    getLineageGraph() {


        return this.lineages;

    }





    /**
     * Find ancestors
     */


    getAncestors(

        objectId

    ) {


        const lineage =

            this.getLineage(

                objectId

            );



        if (

            !lineage

        ) {


            return [];

        }



        return [


            lineage.source


        ];

    }





    /**
     * Add manual lineage
     */


    addLineage(

        lineage

    ) {


        this.lineages.push(

            lineage

        );


        return lineage;

    }





    /**
     * Clear lineage data
     */


    clearLineage() {


        this.lineages = [];


        this.counter = 0;


        return true;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            objects:

                this.lineages.length,


            transformations:

                this.lineages.reduce(

                    (sum, item) =>

                        sum +

                        item.transformations.length,

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


            lineages:

                this.lineages.length


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

            "GRAPH_LINEAGE_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphLineageEngine;
