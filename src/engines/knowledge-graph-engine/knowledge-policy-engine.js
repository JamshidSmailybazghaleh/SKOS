/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Security Stack
 * File        : knowledge-policy-engine.js
 *
 * Build       : BUILD-000909.3
 * Version     : 1.0.0
 *
 * Mission:
 * Execute knowledge governance policies
 * and generate automated decisions.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgePolicyEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-POLICY-ENGINE";


        this.name =
            "Knowledge Policy Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000909.3";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.authorizationEngine =
            options.authorizationEngine || null;


        this.auditEngine =
            options.auditEngine || null;


        this.policies =
            new Map();


        this.executions =
            [];


        this.createdAt =
            new Date();


    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "POLICY_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "POLICY_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Register policy
     */


    registerPolicy(

        policyId,

        definition = {}

    ){


        if(!policyId){


            throw new Error(

                "Policy id required."

            );

        }



        const policy = {


            id:

                policyId,


            name:

                definition.name ||

                "Unnamed Policy",


            type:

                definition.type ||

                "GOVERNANCE",


            condition:

                definition.condition || {},


            effect:

                definition.effect ||

                "DENY",


            priority:

                definition.priority || 0,


            enabled:

                true,


            createdAt:

                new Date()


        };



        this.policies.set(

            policyId,

            policy

        );



        this.recordEvent(

            "POLICY_REGISTERED",

            {
                policyId
            }

        );



        return policy;

    }





    /**
     * Evaluate policy condition
     */


    evaluate(

        condition,

        context

    ){


        const keys =

            Object.keys(

                condition

            );



        if(keys.length === 0){

            return true;

        }



        return keys.every(

            key =>

                context[key] === condition[key]

        );

    }





    /**
     * Execute policy
     */


    execute(

        request = {}

    ){


        const {

            subject,

            resource,

            action,

            context = {}

        } = request;



        const policies =


            Array.from(

                this.policies.values()

            )

            .filter(

                policy =>


                    policy.enabled &&


                    this.evaluate(

                        policy.condition,

                        context

                    )

            );



        let decision =

            "DENY";


        let reason =

            "No policy matched";


        let policyId = null;



        if(

            policies.length > 0

        ){


            const policy =

                policies.sort(

                    (a,b)=>

                        b.priority -

                        a.priority

                )[0];



            decision =

                policy.effect;



            policyId =

                policy.id;



            reason =

                "Policy matched";


        }





        const result = {


            id:

                this.generateId(),


            policyId,


            subject,


            resource,


            action,


            decision,


            reason,


            context,


            timestamp:

                new Date()


        };



        this.executions.push(

            result

        );



        this.recordEvent(

            "POLICY_EXECUTION_COMPLETED",

            result

        );



        this.updateMetric(

            "policyExecutions"

        );



        if(this.auditEngine){


            this.auditEngine.record({

                objectId:

                    resource,


                actor:

                    subject,


                action:

                    "POLICY_EVALUATION",


                result:

                    decision,


                policy:

                    policyId


            });

        }



        return result;

    }





    /**
     * Enable policy
     */


    enablePolicy(

        policyId

    ){


        const policy =

            this.policies.get(

                policyId

            );



        if(policy){

            policy.enabled = true;

        }


        return policy;

    }





    /**
     * Disable policy
     */


    disablePolicy(

        policyId

    ){


        const policy =

            this.policies.get(

                policyId

            );



        if(policy){

            policy.enabled = false;

        }


        return policy;

    }





    removePolicy(

        policyId

    ){


        return this.policies.delete(

            policyId

        );

    }





    getPolicies(){


        return Array.from(

            this.policies.values()

        );

    }





    getExecutionHistory(){


        return this.executions;

    }





    getStatistics(){


        return {


            policies:

                this.policies.size,


            executions:

                this.executions.length,


            allowed:

                this.executions.filter(

                    e =>

                    e.decision === "ALLOW"

                ).length,


            denied:

                this.executions.filter(

                    e =>

                    e.decision === "DENY"

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

            "POLICY_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "POLICY_ENGINE_SHUTDOWN"

        );


        return true;

    }





    generateId(){


        return (

            "POLICY-" +

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

    KnowledgePolicyEngine;
