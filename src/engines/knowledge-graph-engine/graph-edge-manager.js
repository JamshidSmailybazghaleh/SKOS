/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Edge Manager
 *
 * Build      : BUILD-000364
 * Version    : 1.0.0
 *
 * Status     : Monitoring Integrated
 *
 * Mission:
 * Manage relationships between
 * Knowledge Object Nodes.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphEdgeManager {


    constructor(options = {}) {


        this.monitoring =

            options.monitoring || null;


        this.nodeManager =

            options.nodeManager || null;


        this.edges = [];


    }





    /**
     * Create relationship
     */


    addRelation(

        from,

        to,

        type,

        metadata = {}

    ) {


        if (

            !this.nodeManager

            ||

            !this.nodeManager.exists(from)

            ||

            !this.nodeManager.exists(to)

        ) {


            throw new Error(

                "Both nodes must exist."

            );


        }



        const relation = {


            id:

                this.generateId(),


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
     * Remove relationship
     */


    removeRelation(id) {


        const index =

            this.edges.findIndex(

                edge =>

                    edge.id === id

            );



        if (

            index === -1

        ) {


            return false;

        }



        const removed =

            this.edges.splice(

                index,

                1

            )[0];



        this.recordEvent(

            "GRAPH_RELATION_REMOVED",

            {

                id

            }

        );



        this.updateMetric(

            "relationsRemoved"

        );



        return removed;


    }





    /**
     * Find relations by node
     */


    getRelations(nodeId) {


        return this.edges.filter(

            edge =>

                edge.from === nodeId

                ||

                edge.to === nodeId

        );


    }





    /**
     * Find outgoing relations
     */


    getOutgoing(nodeId) {


        return this.edges.filter(

            edge =>

                edge.from === nodeId

        );


    }





    /**
     * Find incoming relations
     */


    getIncoming(nodeId) {


        return this.edges.filter(

            edge =>

                edge.to === nodeId

        );


    }





    /**
     * Return all edges
     */


    getEdges() {


        return [

            ...this.edges

        ];


    }





    /**
     * Count relations
     */


    count() {


        return this.edges.length;


    }





    /**
     * Clear graph relations
     */


    clear() {


        this.edges.length = 0;


    }





    /**
     * Generate relation id
     */


    generateId() {


        return (

            "edge-" +

            Date.now()

            +

            "-" +

            Math.floor(

                Math.random() * 10000

            )

        );


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



}



module.exports =

    GraphEdgeManager;
