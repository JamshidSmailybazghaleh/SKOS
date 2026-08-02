/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Traversal Engine
 *
 * Build      : BUILD-000368
 * Version    : 1.0.0
 *
 * Status     : Monitoring Integrated
 *
 * Mission:
 * Traverse Knowledge Graph structures.
 * Support BFS, DFS and path discovery.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphTraversalEngine {


    constructor(options = {}) {


        this.name =
            "Graph Traversal Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.graph =
            options.graph || null;


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_TRAVERSAL_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Attach graph source
     */


    attachGraph(graph) {


        this.graph = graph;


        this.recordEvent(

            "GRAPH_ATTACHED"

        );


        return true;

    }





    /**
     * Breadth First Search
     */


    bfs(startId) {


        if (!this.graph) {

            throw new Error(

                "Graph is not attached."

            );

        }


        const visited =
            new Set();


        const queue =
            [startId];


        const result =
            [];



        while (queue.length > 0) {


            const current =
                queue.shift();



            if (
                visited.has(current)
            ) {

                continue;

            }



            visited.add(current);



            const node =

                this.graph.getNode(

                    current

                );



            if (node) {

                result.push(node);

            }



            const relations =

                this.graph.getRelations(

                    current

                );



            for (const relation of relations) {


                const next =

                    relation.from === current

                    ?

                    relation.to

                    :

                    relation.from;



                if (
                    !visited.has(next)
                ) {

                    queue.push(next);

                }


            }


        }



        this.recordEvent(

            "GRAPH_BFS_COMPLETED",

            {

                startId,

                count:
                    result.length

            }

        );



        this.updateMetric(

            "bfsOperations"

        );



        return result;


    }





    /**
     * Depth First Search
     */


    dfs(startId) {


        if (!this.graph) {

            throw new Error(

                "Graph is not attached."

            );

        }



        const visited =
            new Set();


        const result =
            [];



        const visit = (id) => {



            if (
                visited.has(id)
            ) {

                return;

            }



            visited.add(id);



            const node =

                this.graph.getNode(

                    id

                );



            if (node) {

                result.push(node);

            }



            const relations =

                this.graph.getRelations(

                    id

                );



            for (const relation of relations) {


                const next =

                    relation.from === id

                    ?

                    relation.to

                    :

                    relation.from;



                visit(next);


            }


        };



        visit(startId);



        this.recordEvent(

            "GRAPH_DFS_COMPLETED",

            {

                startId,

                count:
                    result.length

            }

        );



        this.updateMetric(

            "dfsOperations"

        );



        return result;


    }





    /**
     * Find path between two nodes
     */


    findPath(

        startId,

        targetId

    ) {


        if (!this.graph) {

            throw new Error(

                "Graph is not attached."

            );

        }



        const queue = [

            {

                id:
                    startId,

                path:
                    []

            }

        ];



        const visited =
            new Set();



        while(queue.length > 0) {


            const current =
                queue.shift();



            if (
                visited.has(
                    current.id
                )
            ) {

                continue;

            }



            visited.add(

                current.id

            );



            const path = [

                ...current.path,

                current.id

            ];



            if (

                current.id === targetId

            ) {


                this.recordEvent(

                    "GRAPH_PATH_FOUND",

                    {

                        startId,

                        targetId,

                        length:
                            path.length

                    }

                );


                return path;


            }



            const relations =

                this.graph.getRelations(

                    current.id

                );



            for (const relation of relations) {


                const next =

                    relation.from === current.id

                    ?

                    relation.to

                    :

                    relation.from;



                queue.push({

                    id:
                        next,

                    path

                });


            }


        }



        this.recordEvent(

            "GRAPH_PATH_NOT_FOUND",

            {

                startId,

                targetId

            }

        );



        return null;


    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status


        };


    }





    recordEvent(

        name,

        metadata = {}

    ) {


        if (this.monitoring) {


            this.monitoring.recordEvent(

                name,

                metadata

            );

        }


    }





    updateMetric(

        name

    ) {


        if (this.monitoring) {


            this.monitoring.updateMetric(

                name

            );

        }


    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "GRAPH_TRAVERSAL_ENGINE_SHUTDOWN"

        );


        return true;


    }


}





module.exports =

    GraphTraversalEngine;
