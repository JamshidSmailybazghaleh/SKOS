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
 * Mission:
 * Manage Knowledge Object nodes inside graph.
 *
 * Status:
 * Monitoring Integrated
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


    }





    initialize() {


        this.recordEvent(

            "GRAPH_NODE_MANAGER_INITIALIZED"

        );


        return true;

    }





    addNode(object) {


        if (

            !object ||

            !object.id

        ) {


            throw new Error(

                "Node requires valid Knowledge Object id."

            );

        }



        this.nodes.set(

            object.id,

            object

        );



        this.recordEvent(

            "GRAPH_NODE_CREATED",

            {

                id:

                    object.id

            }

        );



        this.updateMetric(

            "graphNodesCreated"

        );



        return object;

    }





    getNode(id) {


        return (

            this.nodes.get(id)

            ||

            null

        );

    }





    hasNode(id) {


        return this.nodes.has(id);

    }





    removeNode(id) {


        const exists =

            this.nodes.delete(id);



        if (exists) {


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



        return exists;

    }





    getAllNodes() {


        return Array.from(

            this.nodes.values()

        );

    }
getNodes() {

    return this.getAllNodes();

}




    count() {


        return this.nodes.size;

    }





    clear() {


        this.nodes.clear();


        this.recordEvent(

            "GRAPH_NODES_CLEARED"

        );


    }





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


    getAllNodes() {

        return Array.from(
            this.nodes.values()
        );

    }


    getNodes() {

        return this.getAllNodes();

    }


    count() {

        return this.nodes.size;

}


module.exports =

    GraphNodeManager;
