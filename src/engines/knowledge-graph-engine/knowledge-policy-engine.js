/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-policy-engine.js
 *
 * Build       : BUILD-000909
 * Version     : 1.0.0
 *
 * Mission:
 * Execute knowledge policies automatically
 * and generate governance decisions.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgePolicyEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Policy Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000909";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.policies =
            new Map();



        this.executions =
            [];

    }







    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_POLICY_ENGINE_INITIALIZED"

        );


        return true;

    }







    start() {


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_POLICY_ENGINE_STARTED"

        );


        return true;

    }







    stop() {


        this.status =
            "STOPPED";


        this.recordEvent(

            "KNOWLEDGE_POLICY_ENGINE_STOPPED"

        );


        return true;

    }







    /**
     * Register policy
     */


    addPolicy(

        id,

        definition = {}

    ) {


        if (!id) {


            throw new Error(

                "Policy id required."

            );

        }



        const policy = {


            id,


            name:

                definition.name ||

                "Unnamed Policy",



            type:

                definition.type ||

                "GOVERNANCE",



            condition:

                definition.condition || {},



            action:

                definition.action || {},



            effect:

                definition.effect ||

                "ALLOW",



            priority:

                definition.priority || 0,



            enabled:

                true,



            createdAt:

                new Date()

        };



        this.policies.set(

            id,

            policy

        );



        this.recordEvent(

            "POLICY_REGISTERED",

            {

                id

            }

        );



        return policy;

    }







    removePolicy(

        id

    ) {


        return this.policies.delete(

            id

        );

    }







    getPolicy(

        id

    ) {


        return (

            this.policies.get(

                id

            )

            ||

            null

        );

    }







    /**
     * Execute policy
     */


    execute(

        policyId,

        context = {}

    ) {


        const policy =

            this.getPolicy(

                policyId

            );



        if (!policy) {


            throw new Error(

                "Policy not found."

            );

        }





        if (!policy.enabled) {


            return {


                policyId,


                executed:

                    false,


                reason:

                    "POLICY_DISABLED"


            };

        }





        const matched =

            this.evaluateCondition(

                policy.condition,

                context

            );





        const result = {


            policyId,


            policyName:

                policy.name,


            matched,


            effect:

                matched

                    ?

                    policy.effect

                    :

                    "NONE",



            action:

                matched

                    ?

                    policy.action

                    :

                    null,



            context,



            reason:

                matched

                    ?

                    "CONDITION_MATCHED"

                    :

                    "CONDITION_FAILED",



            executedAt:

                new Date()

        };





        this.executions.push(

            result

        );



        this.recordEvent(

            "POLICY_EXECUTED",

            result

        );



        this.updateMetric(

            "policyExecutions"

        );



        return result;

    }







    /**
     * Execute all matching policies
     */


    evaluate(

        context = {}

    ) {


        return Array.from(

            this.policies.values()

        )

        .filter(

            policy =>

                policy.enabled &&

                this.evaluateCondition(

                    policy.condition,

                    context

                )

        )

        .sort(

            (a,b)=>

                b.priority -

                a.priority

        )

        .map(

            policy =>

                this.execute(

                    policy.id,

                    context

                )

        );

    }







    /**
     * Evaluate conditions
     */


    evaluateCondition(

        condition,

        context

    ) {


        const keys =

            Object.keys(

                condition

            );



        if (

            keys.length === 0

        ) {


            return true;

        }



        return keys.every(

            key =>

                context[key] === condition[key]

        );

    }







    enablePolicy(

        id

    ) {


        const policy =

            this.getPolicy(

                id

            );



        if(policy){

            policy.enabled = true;

        }



        return policy;

    }







    disablePolicy(

        id

    ) {


        const policy =

            this.getPolicy(

                id

            );



        if(policy){

            policy.enabled = false;

        }



        return policy;

    }







    getExecutionHistory() {


        return this.executions;

    }







    getRegistry() {


        return Array.from(

            this.policies.values()

        );

    }







    getStatistics() {


        return {


            policies:

                this.policies.size,


            executions:

                this.executions.length,


            allowed:

                this.executions.filter(

                    e =>

                    e.effect === "ALLOW"

                ).length,


            denied:

                this.executions.filter(

                    e =>

                    e.effect === "DENY"

                ).length

        };

    }







    getStatus() {


        return {


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







    recordEvent(

        event,

        metadata = {}

    ) {


        if(this.monitoring){


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }







    updateMetric(

        metric

    ) {


        if(this.monitoring){


            this.monitoring.updateMetric(

                metric

            );

        }

    }







    shutdown() {


        this.status =

            "SHUTDOWN";



        this.recordEvent(

            "KNOWLEDGE_POLICY_ENGINE_SHUTDOWN"

        );



        return true;

    }


}





module.exports =

    KnowledgePolicyEngine;
