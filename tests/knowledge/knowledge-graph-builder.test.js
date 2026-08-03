/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Graph Builder
 * File      : knowledge-graph-builder.js
 *
 * Build     : BUILD-000700.1
 * Version   : 1.0.0
 *
 * Mission:
 * Build relationships between Knowledge Objects.
 * ==========================================================
 */


class KnowledgeGraphBuilder {


    constructor() {


        this.name =
            "Knowledge Graph Builder";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.nodes =
            new Map();


        this.edges =
            [];


    }




    addNode(object) {


        if (!object.id) {

            throw new Error(
                "Knowledge Object requires id."
            );

        }



        this.nodes.set(

            object.id,

            object

        );


        return true;

    }




    removeNode(id) {


        this.nodes.delete(id);



        this.edges =
            this.edges.filter(

                edge =>

                    edge.source !== id &&

                    edge.target !== id

            );



        return true;

    }




    addRelationship(
        source,
        target,
        relation
    ) {



        if (

            !this.nodes.has(source)

            ||

            !this.nodes.has(target)

        ) {

            throw new Error(
                "Both nodes must exist."
            );

        }



        this.edges.push({

            source,

            target,

            relation,

            createdAt:
                new Date()

        });



        return true;

    }




    removeRelationship(
        source,
        target,
        relation
    ) {


        this.edges =
            this.edges.filter(

                edge =>

                    !(
                        edge.source === source
                        &&
                        edge.target === target
                        &&
                        edge.relation === relation
                    )

            );



        return true;

    }




    getNeighbors(id) {


        return this.edges

            .filter(

                edge =>

                    edge.source === id

                    ||

                    edge.target === id

            )

            .map(

                edge => {


                    return (

                        edge.source === id

                        ?

                        this.nodes.get(
                            edge.target
                        )

                        :

                        this.nodes.get(
                            edge.source
                        )

                    );

                }

            );


    }




    getRelationships() {


        return this.edges;

    }




    getGraph() {


        return {


            nodes:

                Array.from(
                    this.nodes.values()
                ),


            edges:

                this.edges


        };

    }




    countNodes() {


        return this.nodes.size;

    }




    countEdges() {


        return this.edges.length;

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


            relationships:

                this.edges.length


        };

    }


}



module.exports =
    KnowledgeGraphBuilder;
