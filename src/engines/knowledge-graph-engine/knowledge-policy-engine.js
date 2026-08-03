/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-policy-engine.js
 *
 * Build       : BUILD-000404
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





    /**
     * Register policy
     */


    addPolicy(

        id,

        definition

    ) {


        if (

            !id

        ) {


            throw new Error(

                "Policy id required."

            );

        }



        const policy = {


            id,


            name:

                definition.name || "Unnamed Policy",


            condition:

                definition.condition || {},


            action:

                definition.action || {},


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





    /**
     * Remove policy
     */


    removePolicy(

        id

    ) {


        return this.policies.delete(

            id

        );

    }





    /**
     * Get policy
     */


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



        if (

            !policy

        ) {


            throw new Error(

                "Policy not found."

            );

        }



        const matched =

            this.evaluateCondition(

                policy.condition,

                context

            );



        const result = {


            policyId,


            matched,


            action:

                matched

                    ?

                    policy.action

                    :

                    null,


            context,


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
     * Evaluate policy conditions
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





    /**
     * Enable policy
     */


    enablePolicy(

        id

    ) {


        const policy =

            this.getPolicy(

                id

            );



        if (

            policy

        ) {


            policy.enabled = true;

        }



        return policy;

    }





    /**
     * Disable policy
     */


    disablePolicy(

        id

    ) {


        const policy =

            this.getPolicy(

                id

            );



        if (

            policy

        ) {


            policy.enabled = false;

        }



        return policy;

    }





    /**
     * Get executions history
     */


    getExecutionHistory() {


        return this.executions;

    }





    /**
     * Get registry
     */


    getRegistry() {


        return Array.from(

            this.policies.values()

        );

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            policies:

                this.policies.size,


            executions:

                this.executions.length


        };

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            policies:

                this.policies.size,


            executions:

                this.executions.length


        };

    }





    recordEvent(

        event,

        metadata = {}

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ) {


        if (

            this.monitoring

        ) {


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
