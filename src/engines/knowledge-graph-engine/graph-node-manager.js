/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Node Manager
 *
 * Build      : BUILD-000363
 * Version    : 1.0.0
 *
 * Status     : Monitoring Integrated
 *
 * Mission:
 * Manage Knowledge Graph Nodes.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphNodeManager {


    constructor(options = {}) {


        this.nodes =
            new Map();


        this.monitoring =
            options.monitoring || null;


        this.name =
            "Graph Node Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_NODE_MANAGER_INITIALIZED"

        );


        return true;

    }





    /**
     * Create Node
     */


    addNode(node) {


        if (

            !node ||

            !node.id

        ) {

            throw new Error(

                "Node requires valid id."

            );

        }



        if (

            this.nodes.has(node.id)

        ) {


            throw new Error(

                "Node already exists."

            );


        }



        this.nodes.set(

            node.id,

            node

        );



        this.recordEvent(

            "GRAPH_NODE_CREATED",

            {

                id:
                    node.id

            }

        );



        this.updateMetric(

            "graphNodesCreated"

        );



        return node;

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
     * Check Node Exists
     */


    hasNode(id) {


        return this.nodes.has(id);


    }





    /**
     * Remove Node
     */


    removeNode(id) {


        const result =

            this.nodes.delete(id);



        if (result) {


            this.recordEvent(

                "GRAPH_NODE_REMOVED",

                {

                    id

                }

            );


            this.updateMetric(

                "graphNodesRemoved"

            );


        }


        return result;


    }





    /**
     * Return All Nodes
     */


    getNodes() {


        return Array.from(

            this.nodes.values()

        );


    }





    /**
     * Node Count
     */


    count() {


        return this.nodes.size;


    }





    /**
     * Clear Graph Nodes
     */


    clear() {


        this.nodes.clear();



        this.recordEvent(

            "GRAPH_NODES_CLEARED"

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


    updateMetric(name) {


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

            "GRAPH_NODE_MANAGER_SHUTDOWN"

        );


        return true;


    }



}



module.exports =

    GraphNodeManager;
