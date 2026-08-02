/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine     : Knowledge Graph Engine
 * Module     : Graph Query Service
 *
 * Build      : BUILD-000363
 * Version    : 1.0.0
 *
 * Status     : Monitoring Integrated
 *
 * Mission:
 * Provide query services over Knowledge Graph.
 *
 * Responsibilities:
 * - Node lookup
 * - Relation search
 * - Graph filtering
 * - Text-based search
 * - Query history tracking
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphQueryService {


    constructor(options = {}) {


        this.name =

            "Graph Query Service";


        this.version =

            "1.0.0";


        this.status =

            "CREATED";


        this.graph =

            options.graph || null;


        this.monitoring =

            options.monitoring || null;


        this.history =

            [];

    }





    initialize() {


        this.status =

            "INITIALIZED";


        this.recordEvent(

            "GRAPH_QUERY_SERVICE_INITIALIZED"

        );


        return true;

    }





    /**
     * Find node by ID
     */


    findById(id) {


        this.recordQuery(

            {

                type:
                    "BY_ID",

                value:
                    id

            }

        );



        if (!this.graph) {

            return null;

        }



        return this.graph.getNode(id);

    }





    /**
     * Search nodes by text
     */


    searchText(text) {


        if (

            !this.graph ||

            !text

        ) {

            return [];

        }



        const value =

            text.toLowerCase();



        const nodes =

            this.graph.getGraph().nodes;



        const result =

            nodes.filter(

                node => {


                    const content =

                        JSON.stringify(node)

                        .toLowerCase();



                    return content.includes(

                        value

                    );

                }

            );



        this.recordQuery(

            {

                type:
                    "TEXT_SEARCH",

                value:
                    text,

                resultCount:
                    result.length

            }

        );



        return result;

    }





    /**
     * Find nodes by metadata tag
     */


    searchByTag(tag) {


        if (

            !this.graph ||

            !tag

        ) {

            return [];

        }



        const nodes =

            this.graph.getGraph().nodes;



        const result =

            nodes.filter(

                node =>


                    node.tags &&

                    node.tags.includes(tag)

            );



        this.recordQuery(

            {

                type:
                    "TAG_SEARCH",

                value:
                    tag,

                resultCount:
                    result.length

            }

        );



        return result;

    }





    /**
     * Get relations for node
     */


    getRelations(id) {


        if (!this.graph) {

            return [];

        }



        const relations =

            this.graph.getRelations(id);



        this.recordQuery(

            {

                type:
                    "RELATION_QUERY",

                value:
                    id,

                resultCount:
                    relations.length

            }

        );



        return relations;

    }





    /**
     * Query complete graph
     */


    query(filter = {}) {


        if (!this.graph) {

            return [];

        }



        let nodes =

            this.graph.getGraph().nodes;



        if (filter.type) {


            nodes =

                nodes.filter(

                    node =>

                        node.type === filter.type

                );

        }



        this.recordQuery(

            {

                type:
                    "GRAPH_QUERY",

                filter

            }

        );



        return nodes;

    }





    /**
     * Query history
     */


    getHistory() {


        return [

            ...this.history

        ];

    }





    recordQuery(query) {


        const entry = {


            ...query,


            timestamp:

                new Date()

        };


        this.history.push(

            entry

        );


        this.recordEvent(

            "GRAPH_QUERY_EXECUTED",

            entry

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





    shutdown() {


        this.status =

            "SHUTDOWN";


        this.recordEvent(

            "GRAPH_QUERY_SERVICE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphQueryService;
