/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-graph-engine.js
 *
 * Build       : BUILD-000420
 * Version     : 1.0.0
 *
 * Mission:
 * Manage knowledge graph nodes, edges,
 * relationships and traversal operations.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeGraphEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-GRAPH-ENGINE";


        this.name =
            "Knowledge Graph Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000420";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.nodes =
            new Map();



        this.edges =
            [];



        this.graphHistory =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_GRAPH_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_GRAPH_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Add graph node
     */


    addNode(

        nodeId,

        data = {}

    ){


        if(!nodeId){


            throw new Error(

                "Node id required."

            );

        }



        const node = {


            id:

                nodeId,


            type:

                data.type || "KNOWLEDGE_OBJECT",


            label:

                data.label || "Unknown",


            properties:

                data.properties || {},


            semantic:

                data.semantic || null,


            ontology:

                data.ontology || null,


            createdAt:

                new Date()

        };



        this.nodes.set(

            nodeId,

            node

        );



        this.recordEvent(

            "GRAPH_NODE_CREATED",

            {

                nodeId

            }

        );



        return node;

    }





    /**
     * Add relationship edge
     */


    addEdge(

        source,

        relation,

        target

    ){


        if(

            !this.nodes.has(source) ||

            !this.nodes.has(target)

        ){


            throw new Error(

                "Graph nodes not found."

            );

        }



        const edge = {


            id:

                "EDGE-" + Date.now(),


            source,


            relation,


            target,


            createdAt:

                new Date()

        };



        this.edges.push(

            edge

        );



        this.graphHistory.push(

            edge

        );



        this.recordEvent(

            "GRAPH_EDGE_CREATED",

            edge

        );



        return edge;

    }





    /**
     * Get node
     */


    getNode(

        nodeId

    ){


        return (

            this.nodes.get(

                nodeId

            )

            ||

            null

        );

    }





    /**
     * Find connected nodes
     */


    getNeighbors(

        nodeId

    ){


        return this.edges.filter(

            edge =>

                edge.source === nodeId ||

                edge.target === nodeId

        );

    }





    /**
     * Graph traversal
     */


    traverse(

        startNode,

        depth = 1

    ){


        const visited =

            new Set();



        const queue =

            [

                {

                    id:

                        startNode,

                    level:

                        0

                }

            ];



        while(queue.length){


            const current =

                queue.shift();



            if(

                visited.has(

                    current.id

                )

            )

                continue;



            visited.add(

                current.id

            );



            if(

                current.level < depth

            ){


                this.getNeighbors(

                    current.id

                )

                .forEach(

                    edge => {


                        const next =

                            edge.source === current.id

                                ?

                                edge.target

                                :

                                edge.source;



                        queue.push(

                            {

                                id:

                                    next,


                                level:

                                    current.level + 1

                            }

                        );

                    }

                );

            }

        }



        return Array.from(

            visited

        );

    }





    /**
     * Search nodes
     */


    search(

        keyword

    ){


        return Array.from(

            this.nodes.values()

        )

        .filter(

            node =>

                node.label

                .toLowerCase()

                .includes(

                    keyword.toLowerCase()

                )

        );

    }





    /**
     * Export graph
     */


    exportGraph(){


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
     * Statistics
     */


    getStatistics(){


        return {


            nodes:

                this.nodes.size,


            edges:

                this.edges.length,


            density:

                this.nodes.size > 0

                ?

                (

                    this.edges.length /

                    this.nodes.size

                )

                :

                0


        };

    }





    getStatus(){


        return {


            engineId:

                this.engineId,


            name:

                this.name,


            version:

                this.version,


            build:

                this.build,


            status:

                this.status,


            statistics:

                this.getStatistics()

        };

    }





    stop(){


        this.status =
            "STOPPED";


        this.recordEvent(

            "KNOWLEDGE_GRAPH_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_GRAPH_ENGINE_SHUTDOWN"

        );


        return true;

    }





    recordEvent(

        event,

        metadata = {}

    ){


        if(this.monitoring){


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ){


        if(this.monitoring){


            this.monitoring.updateMetric(

                metric

            );

        }

    }


}



module.exports =

    KnowledgeGraphEngine;
