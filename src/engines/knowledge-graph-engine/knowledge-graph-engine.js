/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * File       : knowledge-graph-engine.js
 *
 * Build      : BUILD-000363
 * Version    : 1.1.0
 *
 * Status     : Production Ready
 *
 * Mission:
 * Create, manage and analyze relationships
 * between Knowledge Objects.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


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


        this.nodes =
            new Map();


        this.edges =
            [];


        this.events =
            [];


        this.metrics = {

            nodesCreated: 0,

            nodesRemoved: 0,

            relationsCreated: 0,

            relationsRemoved: 0

        };


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_GRAPH_ENGINE_INITIALIZED"

        );


        return true;

    }





    execute(operation, payload = {}) {


        switch(operation) {


            case "ADD_NODE":

                return this.addNode(payload);


            case "ADD_RELATION":

                return this.addRelation(

                    payload.from,

                    payload.to,

                    payload.type,

                    payload.metadata

                );


            case "GET_GRAPH":

                return this.getGraph();


            default:

                throw new Error(

                    "Unknown graph operation."

                );


        }

    }





    addNode(object) {


        if(

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



        this.updateMetric(

            "nodesCreated"

        );



        this.recordEvent(

            "GRAPH_NODE_ADDED",

            {

                id:

                    object.id

            }

        );



        return object;

    }





    removeNode(id) {


        const removed =

            this.nodes.delete(id);



        if(removed) {


            this.edges =

                this.edges.filter(

                    edge =>

                        edge.from !== id &&

                        edge.to !== id

                );



            this.updateMetric(

                "nodesRemoved"

            );



            this.recordEvent(

                "GRAPH_NODE_REMOVED",

                {

                    id

                }

            );

        }



        return removed;

    }





    addRelation(

        from,

        to,

        type,

        metadata = {}

    ) {


        if(

            !this.nodes.has(from) ||

            !this.nodes.has(to)

        ) {


            throw new Error(

                "Both nodes must exist."

            );

        }



        const exists =

            this.edges.some(

                edge =>

                    edge.from === from &&

                    edge.to === to &&

                    edge.type === type

            );



        if(exists) {


            throw new Error(

                "Relation already exists."

            );

        }



        const relation = {


            from,

            to,

            type,

            metadata,


            createdAt:

                new Date().toISOString()


        };



        this.edges.push(

            relation

        );



        this.updateMetric(

            "relationsCreated"

        );



        this.recordEvent(

            "GRAPH_RELATION_CREATED",

            relation

        );



        return relation;

    }





    getNode(id) {


        return (

            this.nodes.get(id)

            ||

            null

        );

    }





    getRelations(id) {


        return this.edges.filter(

            edge =>

                edge.from === id ||

                edge.to === id

        );

    }





    getGraph() {


        return {


            nodes:

                Array.from(

                    this.nodes.values()

                ),


            edges:

                [

                    ...this.edges

                ]

        };

    }





    clearGraph() {


        this.nodes.clear();


        this.edges = [];


        this.recordEvent(

            "GRAPH_CLEARED"

        );


    }





    getEvents() {


        return [

            ...this.events

        ];

    }





    getMetrics() {


        return {


            ...this.metrics

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


            nodes:

                this.nodes.size,


            relations:

                this.edges.length,


            metrics:

                this.metrics


        };

    }





    recordEvent(

        name,

        metadata = {}

    ) {


        const event = {


            name,

            metadata,


            timestamp:

                new Date().toISOString()

        };



        this.events.push(

            event

        );



        if(this.monitoring) {


            this.monitoring.recordEvent(

                name,

                metadata

            );

        }


    }





    updateMetric(name) {


        if(

            !this.metrics[name]

        ) {


            this.metrics[name] = 0;

        }



        this.metrics[name]++;



        if(this.monitoring) {


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
