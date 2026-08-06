/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Edge Manager
 *
 * Build      : BUILD-000426
 * Version    : 2.0.0
 *
 * Status     : Core Stabilization Phase
 *
 * Mission:
 * Manage relationships between Knowledge Objects.
 *
 * Responsibilities:
 * - Create Relations
 * - Remove Relations
 * - Query Graph Edges
 * - Provide Stable Graph API
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphEdgeManager {


    constructor(options = {}) {


        this.name =
            "Graph Edge Manager";


        this.version =
            "2.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.nodeManager =
            options.nodeManager || null;


        this.edges =
            new Map();


        this.sequence =
            0;


        this.history =
            [];

    }



    /**
     * ======================================================
     * Initialize
     * ======================================================
     */


    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_EDGE_MANAGER_INITIALIZED"

        );


        return true;

    }



    /**
     * ======================================================
     * Add Relation
     * ======================================================
     */


    addRelation(

        from,

        to,

        type,

        metadata = {}

    ) {


        if (

            !from ||

            !to

        ) {


            throw new Error(

                "Relation requires source and target nodes."

            );

        }



        if (

            this.nodeManager

        ) {


            const hasFrom =

                typeof this.nodeManager.hasNode === "function"

                    ? this.nodeManager.hasNode(from)

                    : true;



            const hasTo =

                typeof this.nodeManager.hasNode === "function"

                    ? this.nodeManager.hasNode(to)

                    : true;



            if (

                !hasFrom ||

                !hasTo

            ) {


                throw new Error(

                    "Both nodes must exist."

                );

            }


        }



        const id =

            this.generateId();



        const relation = {


            id,


            from,


            to,


            type,


            metadata,


            createdAt:

                new Date()


        };



        this.edges.set(

            id,

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
     * ======================================================
     * Get Relation
     * ======================================================
     */


    getRelation(id) {


        return (

            this.edges.get(id)

            ||

            null

        );

    }



    /**
     * ======================================================
     * Get All Relations
     * ======================================================
     */


    getEdges() {


        return Array.from(

            this.edges.values()

        );

    }



    getRelations(nodeId = null) {


        if (

            nodeId === null

        ) {


            return this.getEdges();

        }



        return this.getEdges()

            .filter(

                edge =>

                    edge.from === nodeId ||

                    edge.to === nodeId

            );


    }



    /**
     * ======================================================
     * Outgoing Relations
     * ======================================================
     */


    getOutgoing(nodeId) {


        return this.getEdges()

            .filter(

                edge =>

                    edge.from === nodeId

            );

    }



    /**
     * ======================================================
     * Incoming Relations
     * ======================================================
     */


    getIncoming(nodeId) {


        return this.getEdges()

            .filter(

                edge =>

                    edge.to === nodeId

            );

    }



    /**
     * ======================================================
     * Remove Relation
     * ======================================================
     */


    removeRelation(id) {


        const relation =

            this.edges.get(id);



        if (

            !relation

        ) {


            return false;

        }



        this.edges.delete(id);



        this.recordEvent(

            "GRAPH_RELATION_REMOVED",

            {

                id

            }

        );



        this.updateMetric(

            "relationsRemoved"

        );



        return true;

    }



    /**
     * ======================================================
     * Remove All Relations Of Node
     * ======================================================
     */


    removeRelationsByNode(nodeId) {


        const removed = [];



        for (

            const [id, edge]

            of this.edges

        ) {


            if (

                edge.from === nodeId ||

                edge.to === nodeId

            ) {


                removed.push(id);

            }


        }



        removed.forEach(

            id =>

                this.edges.delete(id)

        );



        return removed.length;

    }



    /**
     * ======================================================
     * Clear
     * ======================================================
     */


    clear() {


        this.edges.clear();



        this.recordEvent(

            "GRAPH_RELATIONS_CLEARED"

        );

    }



    /**
     * ======================================================
     * Count
     * ======================================================
     */


    count() {


        return this.edges.size;

    }



    /**
     * ======================================================
     * Generate ID
     * ======================================================
     */


    generateId() {


        this.sequence++;



        return (

            "EDGE-" +

            Date.now()

            +

            "-"

            +

            this.sequence

        );


    }



    /**
     * ======================================================
     * Monitoring
     * ======================================================
     */


    recordEvent(

        name,

        metadata = {}

    ) {


        const event = {


            name,


            metadata,


            timestamp:

                new Date()


        };



        this.history.push(event);



        if (

            this.monitoring &&

            typeof this.monitoring.recordEvent === "function"

        ) {


            this.monitoring.recordEvent(

                name,

                metadata

            );

        }


    }



    updateMetric(name) {


        if (

            this.monitoring &&

            typeof this.monitoring.updateMetric === "function"

        ) {


            this.monitoring.updateMetric(

                name

            );

        }

    }



    /**
     * ======================================================
     * Status
     * ======================================================
     */


    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            relations:

                this.count()


        };


    }



    /**
     * ======================================================
     * Shutdown
     * ======================================================
     */


    shutdown() {


        this.status =

            "SHUTDOWN";


        this.recordEvent(

            "GRAPH_EDGE_MANAGER_SHUTDOWN"

        );


        return true;

    }



}



module.exports =

    GraphEdgeManager;
