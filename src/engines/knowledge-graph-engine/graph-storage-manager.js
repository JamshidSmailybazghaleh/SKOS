class GraphStorageManager {

    constructor(options = {}) {

        this.monitoring =
            options.monitoring || null;

        this.storage =
            new Map();

        this.status =
            "CREATED";

    }


    initialize(){

        this.status =
            "INITIALIZED";

        this.recordEvent(
            "GRAPH_STORAGE_INITIALIZED"
        );

        return true;
    }


    saveGraph(graph){

        if(!graph){

            throw new Error(
                "Graph is required."
            );

        }


        this.storage.set(

            "knowledge-graph",

            graph

        );


        this.recordEvent(
            "GRAPH_STORED"
        );


        this.updateMetric(
            "graphsStored"
        );


        return graph;

    }



    loadGraph(){

        return (

            this.storage.get(
                "knowledge-graph"
            )
            ||
            null

        );

    }



    deleteGraph(){

        const removed =
            this.storage.delete(
                "knowledge-graph"
            );


        if(removed){

            this.recordEvent(
                "GRAPH_REMOVED"
            );

            this.updateMetric(
                "graphsRemoved"
            );

        }


        return removed;

    }



    getStatus(){

        return {

            status:
                this.status,

            items:
                this.storage.size

        };

    }



    recordEvent(name,data={}){

        if(this.monitoring){

            this.monitoring.recordEvent(
                name,
                data
            );

        }

    }



    updateMetric(name){

        if(this.monitoring){

            this.monitoring.updateMetric(
                name
            );

        }

    }



    shutdown(){

        this.status =
            "SHUTDOWN";


        this.recordEvent(
            "GRAPH_STORAGE_SHUTDOWN"
        );


        return true;

    }

}


module.exports =
GraphStorageManager;
