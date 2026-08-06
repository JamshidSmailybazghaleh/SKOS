/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Validation Engine
 * File        : knowledge-validation-engine.js
 *
 * Build       : BUILD-000424
 * Version     : 1.0.0
 *
 * Mission:
 * Validate knowledge objects before entering
 * SKOS intelligence layers.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeValidationEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-VALIDATION-ENGINE";


        this.name =
            "Knowledge Validation Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000424";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.validationHistory =
            [];



        this.rules =
            new Map();


    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.loadDefaultRules();


        this.recordEvent(

            "KNOWLEDGE_VALIDATION_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_VALIDATION_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Load default validation rules
     */


    loadDefaultRules(){


        this.addRule(

            "REQUIRED_ID",

            object =>

                Boolean(

                    object.id

                )

        );



        this.addRule(

            "REQUIRED_CONTENT",

            object =>

                Boolean(

                    object.content

                )

        );



        this.addRule(

            "VALID_TYPE",

            object =>

                Boolean(

                    object.type

                )

        );


    }





    /**
     * Add custom validation rule
     */


    addRule(

        id,

        validator

    ){


        this.rules.set(

            id,

            validator

        );


        return true;

    }





    /**
     * Validate knowledge object
     */


    validate(

        knowledgeObject,

        options = {}

    ){


        if(

            !knowledgeObject

        ){


            throw new Error(

                "Knowledge object required."

            );

        }



        const results = [];



        let valid = true;



        for(

            const [

                ruleId,

                validator

            ]

            of this.rules

        ){


            let passed = false;



            try {


                passed =

                    validator(

                        knowledgeObject

                    );


            }

            catch(error){


                passed = false;

            }



            results.push(

                {

                    rule:

                        ruleId,


                    passed

                }

            );



            if(

                !passed

            ){


                valid = false;

            }

        }





        const status =


            valid

            ?

            "VALID"

            :

            (

                options.quarantine

                ?

                "QUARANTINE"

                :

                "INVALID"

            );





        const report = {


            objectId:

                knowledgeObject.id || null,


            status,


            valid,


            checks:

                results,


            timestamp:

                new Date()

        };





        this.validationHistory.push(

            report

        );



        this.recordEvent(

            "KNOWLEDGE_VALIDATION_COMPLETED",

            report

        );



        this.updateMetric(

            "validations"

        );



        return report;

    }





    /**
     * Validate multiple objects
     */


    validateBatch(

        objects = []

    ){


        return objects.map(

            object =>

                this.validate(

                    object

                )

        );

    }





    /**
     * Get validation history
     */


    getHistory(){


        return this.validationHistory;

    }





    /**
     * Get invalid objects
     */


    getInvalid(){

        return this.validationHistory.filter(

            item =>

                item.status !== "VALID"

        );

    }





    clearHistory(){


        this.validationHistory =

            [];


        return true;

    }





    /**
     * Statistics
     */


    getStatistics(){


        return {


            validations:

                this.validationHistory.length,


            valid:

                this.validationHistory.filter(

                    item =>

                        item.status === "VALID"

                ).length,



            invalid:

                this.validationHistory.filter(

                    item =>

                        item.status === "INVALID"

                ).length,



            quarantine:

                this.validationHistory.filter(

                    item =>

                        item.status === "QUARANTINE"

                ).length

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


            rules:

                this.rules.size,


            statistics:

                this.getStatistics()

        };

    }





    stop(){


        this.status =
            "STOPPED";


        this.recordEvent(

            "KNOWLEDGE_VALIDATION_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_VALIDATION_ENGINE_SHUTDOWN"

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

    KnowledgeValidationEngine;
