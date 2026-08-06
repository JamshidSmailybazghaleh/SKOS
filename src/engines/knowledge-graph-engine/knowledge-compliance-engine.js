/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Governance Layer
 * File        : knowledge-compliance-engine.js
 *
 * Build       : BUILD-000910.1
 * Version     : 1.0.0
 *
 * Mission:
 * Validate knowledge activities against governance,
 * regulatory and operational compliance rules.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeComplianceEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-COMPLIANCE-ENGINE";


        this.name =
            "Knowledge Compliance Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000910.1";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.auditEngine =
            options.auditEngine || null;


        this.policyEngine =
            options.policyEngine || null;


        this.securityEngine =
            options.securityEngine || null;


        this.rules =
            new Map();


        this.assessments =
            [];


        this.violations =
            [];


        this.createdAt =
            new Date();


    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "COMPLIANCE_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "COMPLIANCE_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Register compliance rule
     */


    addRule(

        ruleId,

        definition = {}

    ){


        if(!ruleId){


            throw new Error(

                "Compliance rule id required."

            );

        }



        const rule = {


            id:

                ruleId,


            name:

                definition.name ||

                "Unnamed Rule",


            category:

                definition.category ||

                "GOVERNANCE",


            condition:

                definition.condition || {},


            severity:

                definition.severity ||

                "MEDIUM",


            enabled:

                true,


            createdAt:

                new Date()


        };



        this.rules.set(

            ruleId,

            rule

        );



        this.recordEvent(

            "COMPLIANCE_RULE_CREATED",

            {

                ruleId

            }

        );



        return rule;

    }





    /**
     * Evaluate compliance rule
     */


    evaluateRule(

        rule,

        context

    ){


        const keys =

            Object.keys(

                rule.condition

            );



        if(keys.length === 0){


            return true;

        }



        return keys.every(

            key =>

                context[key] ===

                rule.condition[key]

        );

    }





    /**
     * Compliance assessment
     */


    assess(

        request = {}

    ){


        const {

            objectId,

            actor,

            action,

            context = {}

        } = request;



        const results =

            [];



        let compliant = true;



        for(

            const rule of

            this.rules.values()

        ){


            if(

                !rule.enabled

            ){

                continue;

            }



            const passed =

                this.evaluateRule(

                    rule,

                    context

                );



            const result = {


                ruleId:

                    rule.id,


                passed,


                severity:

                    rule.severity


            };



            results.push(

                result

            );



            if(!passed){


                compliant = false;



                this.createViolation({

                    objectId,


                    actor,


                    action,


                    ruleId:

                        rule.id,


                    severity:

                        rule.severity

                });

            }


        }





        const assessment = {


            id:

                this.generateId(),


            objectId,


            actor,


            action,


            compliant,


            results,


            timestamp:

                new Date()


        };



        this.assessments.push(

            assessment

        );



        this.recordEvent(

            "COMPLIANCE_ASSESSMENT_COMPLETED",

            assessment

        );



        if(this.auditEngine){


            this.auditEngine.record({

                objectId,


                actor:


                    actor || "SYSTEM",


                action:

                    "COMPLIANCE_ASSESSMENT",


                result:

                    compliant

                    ?

                    "PASS"

                    :

                    "FAIL"


            });

        }



        return assessment;

    }





    /**
     * Create violation
     */


    createViolation(

        data = {}

    ){


        const violation = {


            id:

                this.generateViolationId(),


            objectId:

                data.objectId || null,


            actor:

                data.actor || "SYSTEM",


            action:

                data.action || "UNKNOWN",


            ruleId:

                data.ruleId,


            severity:

                data.severity || "MEDIUM",


            status:

                "OPEN",


            createdAt:

                new Date()


        };



        this.violations.push(

            violation

        );



        this.recordEvent(

            "COMPLIANCE_VIOLATION_CREATED",

            violation

        );



        return violation;

    }





    resolveViolation(

        violationId

    ){


        const violation =

            this.violations.find(

                item =>

                item.id === violationId

            );



        if(violation){


            violation.status =

                "RESOLVED";

        }



        return violation;

    }





    getRules(){


        return Array.from(

            this.rules.values()

        );

    }





    getAssessments(){


        return this.assessments;

    }





    getViolations(){


        return this.violations;

    }





    getStatistics(){


        return {


            rules:

                this.rules.size,


            assessments:

                this.assessments.length,


            violations:

                this.violations.length,


            openViolations:

                this.violations.filter(

                    item =>

                    item.status === "OPEN"

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


            statistics:

                this.getStatistics()


        };

    }





    stop(){


        this.status =
            "STOPPED";


        this.recordEvent(

            "COMPLIANCE_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "COMPLIANCE_ENGINE_SHUTDOWN"

        );


        return true;

    }





    generateId(){


        return (

            "COMPLIANCE-" +

            Date.now()

        );

    }





    generateViolationId(){


        return (

            "VIOLATION-" +

            Date.now()

        );

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

    KnowledgeComplianceEngine;
