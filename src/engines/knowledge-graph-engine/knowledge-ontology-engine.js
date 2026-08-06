/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-ontology-engine.js
 *
 * Build       : BUILD-000418
 * Version     : 1.0.0
 *
 * Mission:
 * Manage ontology structures, classes,
 * properties and semantic constraints.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeOntologyEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-ONTOLOGY-ENGINE";


        this.name =
            "Knowledge Ontology Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000418";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.classes =
            new Map();


        this.properties =
            new Map();


        this.relations =
            new Map();


        this.constraints =
            new Map();


        this.ontologyVersions =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_ONTOLOGY_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_ONTOLOGY_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Create ontology class
     */


    addClass(

        classId,

        definition = {}

    ){


        if(!classId){


            throw new Error(

                "Ontology class id required."

            );

        }



        const ontologyClass = {


            id:

                classId,


            name:

                definition.name || "Unknown",


            parent:

                definition.parent || null,


            description:

                definition.description || "",


            metadata:

                definition.metadata || {},


            createdAt:

                new Date()

        };



        this.classes.set(

            classId,

            ontologyClass

        );



        this.recordEvent(

            "ONTOLOGY_CLASS_CREATED",

            {

                classId

            }

        );



        return ontologyClass;

    }





    /**
     * Add property
     */


    addProperty(

        propertyId,

        definition = {}

    ){


        const property = {


            id:

                propertyId,


            domain:

                definition.domain || null,


            range:

                definition.range || null,


            type:

                definition.type || "ATTRIBUTE",


            createdAt:

                new Date()

        };



        this.properties.set(

            propertyId,

            property

        );



        return property;

    }





    /**
     * Add relation type
     */


    addRelation(

        relationId,

        definition = {}

    ){


        const relation = {


            id:

                relationId,


            source:

                definition.source || null,


            target:

                definition.target || null,


            cardinality:

                definition.cardinality || "MANY_TO_MANY",


            createdAt:

                new Date()

        };



        this.relations.set(

            relationId,

            relation

        );



        return relation;

    }





    /**
     * Add constraint
     */


    addConstraint(

        constraintId,

        definition = {}

    ){


        const constraint = {


            id:

                constraintId,


            target:

                definition.target || null,


            rule:

                definition.rule || null,


            severity:

                definition.severity || "WARNING",


            createdAt:

                new Date()

        };



        this.constraints.set(

            constraintId,

            constraint

        );



        return constraint;

    }





    /**
     * Validate ontology object
     */


    validate(

        object

    ){


        const errors = [];



        for(

            const constraint of this.constraints.values()

        ){


            if(

                constraint.rule &&

                !constraint.rule(object)

            ){


                errors.push(

                    constraint.id

                );

            }

        }



        return {


            valid:

                errors.length === 0,


            errors


        };

    }





    /**
     * Create ontology version
     */


    createVersion(

        version,

        description = ""

    ){


        const record = {


            version,


            description,


            createdAt:

                new Date()


        };



        this.ontologyVersions.push(

            record

        );



        return record;

    }





    getClass(

        classId

    ){


        return (

            this.classes.get(

                classId

            )

            ||

            null

        );

    }





    getOntology(){

        return {


            classes:

                Array.from(

                    this.classes.values()

                ),


            properties:

                Array.from(

                    this.properties.values()

                ),


            relations:

                Array.from(

                    this.relations.values()

                ),


            constraints:

                Array.from(

                    this.constraints.values()

                )

        };

    }





    getVersions(){


        return this.ontologyVersions;

    }





    getStatistics(){


        return {


            classes:

                this.classes.size,


            properties:

                this.properties.size,


            relations:

                this.relations.size,


            constraints:

                this.constraints.size,


            versions:

                this.ontologyVersions.length


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

            "KNOWLEDGE_ONTOLOGY_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_ONTOLOGY_ENGINE_SHUTDOWN"

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

    KnowledgeOntologyEngine;
