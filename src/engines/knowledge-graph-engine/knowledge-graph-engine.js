/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * File       : knowledge-graph-engine.js
 *
 * Build      : BUILD-000362
 * Version    : 1.0.0
 *
 * Status     : Monitoring Integrated
 *
 * Mission:
 * Create and manage relationships between
 * Knowledge Objects.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeGraphEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Graph Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.nodes =
            new Map();


        this.edges =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_GRAPH_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Add Knowledge Object Node
     */


    addNode(object) {


        if (
            !object ||
            !object.id
        ) {

            throw new Error(

                "Knowledge Object requires valid id."

            );

        }


        this.nodes.set(

            object.id,

            object

        );


        this.recordEvent(

            "GRAPH_NODE_ADDED",

            {

                id:
                    object.id

            }

        );


        this.updateMetric(

            "nodesCreated"

        );


        return object;

    }





    /**
     * Remove Node
     */


    removeNode(id) {


        const removed =

            this.nodes.delete(id);



        if (removed) {


            this.recordEvent(

                "GRAPH_NODE_REMOVED",

                {

                    id

                }

            );


            this.updateMetric(

                "nodesRemoved"

            );

        }


        return removed;

    }





    /**
     * Create Relationship
     */


    addRelation(

        from,

        to,

        type,

        metadata = {}

    ) {


        if (

            !this.nodes.has(from) ||

            !this.nodes.has(to)

        ) {

            throw new Error(

                "Both nodes must exist."

            );

        }



        const relation = {


            from,


            to,


            type,


            metadata,


            createdAt:

                new Date()

        };



        this.edges.push(

            relation

        );



        this.recordEvent(

            "GRAPH_RELATION_CREATED",

            relation

        );


        this.updateMetric(

            "relationsCreated"

        );


        return relation;

    }





    /**
     * Get Node
     */


    getNode(id) {


        return (

            this.nodes.get(id)

            ||

            null

        );

    }





    /**
     * Get Relations of Node
     */


    getRelations(id) {


        return this.edges.filter(

            edge =>

                edge.from === id ||

                edge.to === id

        );

    }





    /**
     * Return Complete Graph
     */


    getGraph() {


        return {


            nodes:

                Array.from(

                    this.nodes.values()

                ),


            edges:

                this.edges

        };

    }





    /**
     * Graph Statistics
     */


    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            nodes:

                this.nodes.size,


            relations:

                this.edges.length


        };

    }





    /**
     * Monitoring Event
     */


    recordEvent(

        name,

        metadata = {}

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                name,

                metadata

            );

        }


    }





    /**
     * Monitoring Metric
     */


    updateMetric(

        name

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.updateMetric(

                name

            );

        }


    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_GRAPH_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeGraphEngine;
