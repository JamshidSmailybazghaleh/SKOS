/*
====================================================
SKOS Mission Control

Knowledge Graph Engine

BUILD-000362

Version:
1.0

Status:
ACTIVE
====================================================
*/

const KnowledgeGraphEngine = {

    graph: {

        nodes: [],

        edges: []

    },

    async initialize() {

        Logger.info(

            "Knowledge Graph Engine Initializing..."

        );

        return true;

    },

    addNode(object) {

        this.graph.nodes.push({

            id: object.id,

            title: object.title,

            type: object.type

        });

    },

    addEdge(

        from,

        to,

        relation

    ) {

        this.graph.edges.push({

            from,

            to,

            relation

        });

    },

    build(object) {

        this.addNode(object);

        if (

            object.metadata.author

        ) {

            this.addEdge(

                object.id,

                object.metadata.author,

                "AUTHORED_BY"

            );

        }

        if (

            object.metadata.category

        ) {

            this.addEdge(

                object.id,

                object.metadata.category,

                "CATEGORY"

            );

        }

        if (

            object.metadata.tags

        ) {

            object.metadata.tags.forEach(

                tag =>

                this.addEdge(

                    object.id,

                    tag,

                    "TAG"

                )

            );

        }

        if (

            object.metadata.references

        ) {

            object.metadata.references.forEach(

                reference =>

                this.addEdge(

                    object.id,

                    reference,

                    "REFERENCE"

                )

            );

        }

        return true;

    },

    getNode(id) {

        return this.graph.nodes.find(

            node =>

            node.id === id

        );

    },

    getEdges(id) {

        return this.graph.edges.filter(

            edge =>

            edge.from === id ||

            edge.to === id

        );

    },

    export() {

        return this.graph;

    },

    statistics() {

        return {

            nodes:

                this.graph.nodes.length,

            edges:

                this.graph.edges.length

        };

    },

    status() {

        return "READY";

    }

};

window.KnowledgeGraphEngine =

KnowledgeGraphEngine;

Object.freeze(

KnowledgeGraphEngine
);
