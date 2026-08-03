/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-security-policy-engine.js
 *
 * Build       : BUILD-000422
 * Version     : 1.0.0
 *
 * Mission:
 * Central security policy management layer for SKOS.
 *
 * Controls:
 * - Security policies
 * - Compliance rules
 * - Risk decisions
 * - Policy evaluation
 * - Security governance
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeSecurityPolicyEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Security Policy Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.policies =
            new Map();


        this.evaluations =
            [];


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_SECURITY_POLICY_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Create security policy
     */


    createPolicy(

        policyId,

        policy

    ) {


        if (

            !policyId

        ) {


            throw new Error(

                "Security policy id required."

            );

        }



        const record = {


            id:

                policyId,


            name:

                policy.name || "Unnamed Policy",


            type:

                policy.type || "SECURITY",


            rules:

                policy.rules || [],


            priority:

                policy.priority || 0,


            enabled:

                true,


            createdAt:

                new Date()

        };



        this.policies.set(

            policyId,

            record

        );



        this.recordEvent(

            "SECURITY_POLICY_CREATED",

            {

                policyId

            }

        );



        return record;

    }





    /**
     * Evaluate security policy
     */


    evaluate(

        context

    ) {


        const activePolicies =

            Array.from(

                this.policies.values()

            )

            .filter(

                policy =>

                    policy.enabled

            )

            .sort(

                (

                    a,

                    b

                ) =>

                    b.priority -

                    a.priority

            );



        let decision =

            "ALLOW";



        let matchedPolicy = null;



        for (

            const policy of activePolicies

        ) {


            for (

                const rule of policy.rules

            ) {


                if (

                    this.matchRule(

                        rule,

                        context

                    )

                ) {


                    decision =

                        rule.effect || "DENY";


                    matchedPolicy =

                        policy.id;


                    break;

                }

            }


            if (

                matchedPolicy

            ) {


                break;

            }

        }



        const result = {


            decision,


            allowed:

                decision === "ALLOW",


            policy:

                matchedPolicy,


            context,


            timestamp:

                new Date()

        };



        this.evaluations.push(

            result

        );



        this.recordEvent(

            "SECURITY_POLICY_EVALUATED",

            result

        );



        return result;

    }





    /**
     * Rule matching
     */


    matchRule(

        rule,

        context

    ) {


        if (

            !rule

        ) {


            return false;

        }



        return (

            (

                !rule.subject ||

                rule.subject === context.subject ||

                rule.subject === "*"

            )

            &&

            (

                !rule.resource ||

                rule.resource === context.resource ||

                rule.resource === "*"

            )

            &&

            (

                !rule.action ||

                rule.action === context.action ||

                rule.action === "*"

            )

        );

    }





    /**
     * Disable policy
     */


    disablePolicy(

        policyId

    ) {


        const policy =

            this.policies.get(

                policyId

            );



        if (

            policy

        ) {


            policy.enabled = false;

        }



        this.recordEvent(

            "SECURITY_POLICY_DISABLED",

            {

                policyId

            }

        );



        return policy;

    }





    /**
     * Enable policy
     */


    enablePolicy(

        policyId

    ) {


        const policy =

            this.policies.get(

                policyId

            );



        if (

            policy

        ) {


            policy.enabled = true;

        }



        this.recordEvent(

            "SECURITY_POLICY_ENABLED",

            {

                policyId

            }

        );



        return policy;

    }





    getPolicy(

        policyId

    ) {


        return this.policies.get(

            policyId

        );

    }





    getPolicies() {


        return Array.from(

            this.policies.values()

        );

    }





    getEvaluations() {


        return this.evaluations;

    }





    getStatistics() {


        return {


            policies:

                this.policies.size,


            evaluations:

                this.evaluations.length,


            allowed:

                this.evaluations.filter(

                    item =>

                        item.allowed

                ).length,


            denied:

                this.evaluations.filter(

                    item =>

                        !item.allowed

                ).length,


            activePolicies:

                this.getPolicies()

                    .filter(

                        item =>

                            item.enabled

                    )

                    .length


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


            evaluations:

                this.evaluations.length


        };

    }





    recordEvent(

        event,

        metadata = {}

    ) {


        const record = {


            event,


            metadata,


            timestamp:

                new Date()

        };



        this.history.push(

            record

        );



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

            "KNOWLEDGE_SECURITY_POLICY_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeSecurityPolicyEngine;
