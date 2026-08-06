/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Intelligence Layer
 * File        : knowledge-semantic-engine.js
 *
 * Build       : BUILD-000911.4
 * Version     : 1.0.0
 *
 * Mission:
 * Manage semantic concepts, relationships and ontology
 * structures inside SKOS Knowledge Graph.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeSemanticEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-SEMANTIC-ENGINE";


        this.name =
            "Knowledge Semantic Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000911.4";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.concepts =
            new Map();



        this.relationships =
            [];



        this.ontology =
            new Map();



        this.semanticHistory =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_SEMANTIC_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_SEMANTIC_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Create semantic concept
     */


    addConcept(

        conceptId,

        definition = {}

    ){


        if(!conceptId){


            throw new Error(

                "Concept id required."

            );

        }



        const concept = {


            id:

                conceptId,


            name:

                definition.name || "Unknown",


            category:

                definition.category || "GENERAL",


            description:

                definition.description || "",


            synonyms:

                definition.synonyms || [],


            attributes:

                definition.attributes || {},


            createdAt:

                new Date()

        };



        this.concepts.set(

            conceptId,

            concept

        );



        this.recordEvent(

            "SEMANTIC_CONCEPT_CREATED",

            {

                conceptId

            }

        );



        return concept;

    }





    /**
     * Add semantic relationship
     */


    addRelationship(

        sourceId,

        relation,

        targetId

    ){


        if(

            !this.concepts.has(sourceId) ||

            !this.concepts.has(targetId)

        ){


            throw new Error(

                "Semantic concepts not found."

            );

        }



        const edge = {


            source:

                sourceId,


            relation,


            target:

                targetId,


            createdAt:

                new Date()

        };



        this.relationships.push(

            edge

        );



        this.recordEvent(

            "SEMANTIC_RELATIONSHIP_CREATED",

            edge

        );



        return edge;

    }





    /**
     * Add ontology definition
     */


    addOntology(

        ontologyId,

        definition = {}

    ){


        const item = {


            id:

                ontologyId,


            parent:

                definition.parent || null,


            concepts:

                definition.concepts || [],


            rules:

                definition.rules || [],


            createdAt:

                new Date()

        };



        this.ontology.set(

            ontologyId,

            item

        );



        return item;

    }





    /**
     * Find concept
     */


    getConcept(

        conceptId

    ){


        return (

            this.concepts.get(

                conceptId

            )

            ||

            null

        );

    }





    /**
     * Search semantic similarity
     */


    compareConcepts(

        conceptA,

        conceptB

    ){


        const a =

            this.getConcept(

                conceptA

            );


        const b =

            this.getConcept(

                conceptB

            );



        if(

            !a ||

            !b

        ){


            return null;

        }



        let score = 0;



        if(

            a.category === b.category

        ){


            score += 0.4;

        }



        const commonSynonyms =

            a.synonyms.filter(

                item =>

                    b.synonyms.includes(item)

            );



        score +=

            commonSynonyms.length * 0.1;



        return {


            source:

                conceptA,


            target:

                conceptB,


            similarity:

                Math.min(

                    score,

                    1

                )

        };

    }





    /**
     * Get semantic graph
     */


    getSemanticGraph(){


        return {


            concepts:

                Array.from(

                    this.concepts.values()

                ),


            relationships:

                this.relationships


        };

    }





    /**
     * Get ontology registry
     */


    getOntology(){


        return Array.from(

            this.ontology.values()

        );

    }





    /**
     * Semantic history
     */


    getHistory(){


        return this.semanticHistory;

    }





    /**
     * Statistics
     */


    getStatistics(){


        return {


            concepts:

                this.concepts.size,


            relationships:

                this.relationships.length,


            ontologies:

                this.ontology.size


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

            "KNOWLEDGE_SEMANTIC_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_SEMANTIC_ENGINE_SHUTDOWN"

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

    KnowledgeSemanticEngine;
