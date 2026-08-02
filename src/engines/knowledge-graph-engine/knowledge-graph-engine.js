/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * File       : knowledge-graph-engine.js
 *
 * Build      : BUILD-000365
 * Version    : 1.1.0
 *
 * Status     : Monitoring Integrated
 *
 * Mission:
 * Coordinate Knowledge Graph Operations.
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

            "1.1.0";



        this.status =

            "CREATED";



        this.monitoring =

            options.monitoring || null;



        this.nodeManager =

            new GraphNodeManager({

                monitoring:

                    this.monitoring

            });




        this.edgeManager =

            new GraphEdgeManager({

                monitoring:

                    this.monitoring,


                nodeManager:

                    this.nodeManager

            });



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
     * Node Operations
     */


    addNode(object) {



        return this.nodeManager.addNode(

            object

        );


    }





    removeNode(id) {



        return this.nodeManager.removeNode(

            id

        );


    }





    getNode(id) {



        return this.nodeManager.getNode(

            id

        );


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






    getRelations(id) {



        return this.edgeManager.getRelations(

            id

        );


    }







    /**
     * Complete Graph
     */


    getGraph() {



        return {



            nodes:

                this.nodeManager.getNodes(),




            edges:

                this.edgeManager.getEdges()



        };


    }







    /**
     * Graph Status
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



        if (

            this.monitoring

        ) {



            this.monitoring.recordEvent(

                name,

                metadata

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
