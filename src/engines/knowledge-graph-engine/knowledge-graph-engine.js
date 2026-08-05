/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * File       : knowledge-graph-engine.js
 *
 * Build      : BUILD-000425
 * Version    : 2.0.0
 *
 * Status     : Core Stabilization Phase
 *
 * Mission:
 * Coordinate Knowledge Graph Operations.
 *
 * Responsibilities:
 * - Manage Knowledge Nodes
 * - Manage Knowledge Relations
 * - Provide Graph Access Layer
 * - Provide Stable API for SKOS Engines
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */

const GraphNodeManager =
    require("./graph-node-manager");

const GraphEdgeManager =
    require("./graph-edge-manager");


class KnowledgeGraphEngine {

    constructor(options = {}) {

        this.name =
            "Knowledge Graph Engine";

        this.version =
            "2.0.0";

        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.nodeManager =
            new GraphNodeManager({
                monitoring: this.monitoring
            });


        this.edgeManager =
            new GraphEdgeManager({
                monitoring: this.monitoring,
                nodeManager: this.nodeManager
            });


        this.history =
            [];

    }


    /**
     * Initialize Engine
     */

    initialize() {

        this.nodeManager.initialize();

        this.edgeManager.initialize?.();


        this.status =
            "INITIALIZED";


        this.recordEvent(
            "KNOWLEDGE_GRAPH_ENGINE_INITIALIZED"
        );


        return true;

    }



    /**
     * Node Operations
     */


    addNode(object) {

        const result =
            this.nodeManager.addNode(object);


        this.recordEvent(
            "KNOWLEDGE_GRAPH_NODE_ADDED",
            {
                id: object.id
            }
        );


        return result;

    }



    removeNode(id) {

    if (this.edgeManager.removeRelationsByNode) {

        this.edgeManager.removeRelationsByNode(id);

    }

    const result =
        this.nodeManager.removeNode(id);


    if (result) {

        this.recordEvent(
            "KNOWLEDGE_GRAPH_NODE_REMOVED",
            {
                id
            }
        );

    }

    return result;

}


    getNode(id) {

        return this.nodeManager.getNode(id);

    }



    getNodes() {

        return this.nodeManager.getAllNodes();

    }



    hasNode(id) {

        return this.nodeManager.hasNode(id);

    }




    /**
     * Relation Operations
     */


    addRelation(
        from,
        to,
        type,
        metadata = {}
    ) {


        return this.edgeManager.addRelation(
            from,
            to,
            type,
            metadata
        );

    }



    removeRelation(id) {

        return this.edgeManager.removeRelation(id);

    }



    getRelations(id = null) {

    if (id === null) {

        return this.edgeManager.getEdges();

    }

    return this.edgeManager.getRelations(id);

}



    getOutgoing(id) {

        return this.edgeManager.getOutgoing(id);

    }



    getIncoming(id) {

        return this.edgeManager.getIncoming(id);

    }




    /**
     * Complete Graph Export
     */


    getGraph() {


        return {

            name:
                this.name,


            version:
                this.version,


            nodes:
                this.getNodes(),


            edges:
                this.edgeManager.getEdges()


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
                this.nodeManager.count(),


            relations:
                this.edgeManager.count()


        };


    }




    /**
     * Monitoring Event
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
            this.monitoring.recordEvent
        ) {


            this.monitoring.recordEvent(
                name,
                metadata
            );

        }


    }





    /**
     * History
     */


    getHistory() {

        return [
            ...this.history
        ];

    }





    /**
     * Shutdown
     */


    shutdown() {
shutdown() {


    if (this.nodeManager.shutdown) {

        this.nodeManager.shutdown();

    }


    if (this.edgeManager.shutdown) {

        this.edgeManager.shutdown();

    }


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
