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
 * Version    : 2.0.0
 *
 * Status     : Core Stabilization Phase
 *
 * Mission:
 * Manage Knowledge Graph Relations.
 *
 * Responsibilities:
 * - Create Relations
 * - Remove Relations
 * - Query Relations
 * - Manage Graph Edges
 * - Provide Stable Edge API
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphEdgeManager {


    constructor(options = {}) {


        this.edges =
            new Map();


        this.monitoring =
            options.monitoring || null;


        this.nodeManager =
            options.nodeManager || null;


        this.status =
            "CREATED";


        this.sequence =
            0;


    }



    /**
     * Initialize
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
     * Add Relation
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



        const id =

            `REL-${++this.sequence}`;



        const relation = {


            id,


            from,


            to,


            type:


                type || "RELATED",



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

            {

                id

            }

        );



        this.updateMetric(

            "graphRelationsCreated"

        );



        return relation;


    }




    /**
     * Get Relation
     */


    getRelation(id) {


        return (

            this.edges.get(id)

            ||

            null

        );


    }





    /**
     * Remove Relation
     */


    removeRelation(id) {


        const result =

            this.edges.delete(id);



        if (result) {


            this.recordEvent(

                "GRAPH_RELATION_REMOVED",

                {

                    id

                }

            );


            this.updateMetric(

                "graphRelationsRemoved"

            );


        }



        return result;


    }





    /**
     * Remove All Relations Connected To Node
     */


    removeRelationsByNode(nodeId) {


        let removed = false;



        for (

            const [id, edge]

            of this.edges

        ) {


            if (

                edge.from === nodeId ||

                edge.to === nodeId

            ) {


                this.edges.delete(id);


                removed = true;


            }


        }



        if (removed) {


            this.recordEvent(

                "GRAPH_RELATIONS_REMOVED_BY_NODE",

                {

                    nodeId

                }

            );


        }



        return removed;


    }





    /**
     * Get All Relations
     */


    getEdges() {


        return Array.from(

            this.edges.values()

        );


    }





    /**
     * Alias
     */


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
     * Outgoing Relations
     */


    getOutgoing(nodeId) {


        return this.getEdges()

            .filter(

                edge =>

                    edge.from === nodeId

            );


    }





    /**
     * Incoming Relations
     */


    getIncoming(nodeId) {


        return this.getEdges()

            .filter(

                edge =>

                    edge.to === nodeId

            );


    }





    /**
     * Count
     */


    count() {


        return this.edges.size;


    }





    /**
     * Clear
     */


    clear() {


        this.edges.clear();



        this.recordEvent(

            "GRAPH_RELATIONS_CLEARED"

        );


    }





    /**
     * Monitoring
     */


    recordEvent(

        name,

        metadata = {}

    ) {


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





    updateMetric(

        name

    ) {


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
     * Shutdown
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
