/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-authorization-engine.js
 *
 * Build       : BUILD-000416
 * Version     : 1.0.0
 *
 * Mission:
 * Decide whether authenticated identities or AI agents
 * are authorized to perform actions on knowledge resources.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeAuthorizationEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Authorization Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.rules =
            new Map();


        this.decisions =
            [];


        this.roleHierarchy =
            new Map();


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_AUTHORIZATION_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Add authorization rule
     */


    addRule(

        ruleId,

        rule

    ) {


        if (

            !ruleId

        ) {


            throw new Error(

                "Authorization rule id required."

            );

        }



        const record = {


            id:

                ruleId,


            subject:

                rule.subject || null,


            resource:

                rule.resource || null,


            actions:

                rule.actions || [],


            effect:

                rule.effect || "DENY",


            priority:

                rule.priority || 0,


            enabled:

                true,


            createdAt:

                new Date()

        };



        this.rules.set(

            ruleId,

            record

        );



        this.recordEvent(

            "AUTHORIZATION_RULE_CREATED",

            {

                ruleId

            }

        );



        return record;

    }





    /**
     * Add role inheritance
     */


    addRoleInheritance(

        parentRole,

        childRole

    ) {


        if (

            !this.roleHierarchy.has(

                childRole

            )

        ) {


            this.roleHierarchy.set(

                childRole,

                []

            );

        }



        this.roleHierarchy

            .get(childRole)

            .push(

                parentRole

            );



        return true;

    }





    /**
     * Check authorization
     */


    authorize(

        subject,

        resource,

        action

    ) {


        const matchingRules =

            Array.from(

                this.rules.values()

            ).filter(

                rule =>


                    rule.enabled &&

                    (

                        rule.subject === subject ||

                        rule.subject === "*"

                    ) &&

                    (

                        rule.resource === resource ||

                        rule.resource === "*"

                    ) &&

                    rule.actions.includes(

                        action

                    )

            );



        let allowed = false;



        if (

            matchingRules.length > 0

        ) {


            const rule =

                matchingRules.sort(

                    (

                        a,

                        b

                    ) =>

                        b.priority -

                        a.priority

                )[0];



            allowed =

                rule.effect === "ALLOW";


        }



        const decision = {


            subject,


            resource,


            action,


            allowed,


            timestamp:

                new Date()


        };



        this.decisions.push(

            decision

        );



        this.recordEvent(

            "AUTHORIZATION_DECISION_CREATED",

            decision

        );



        return decision;

    }





    /**
     * Disable authorization rule
     */


    disableRule(

        ruleId

    ) {


        const rule =

            this.rules.get(

                ruleId

            );



        if (

            rule

        ) {


            rule.enabled = false;

        }



        return rule;

    }





    /**
     * Enable authorization rule
     */


    enableRule(

        ruleId

    ) {


        const rule =

            this.rules.get(

                ruleId

            );



        if (

            rule

        ) {


            rule.enabled = true;

        }



        return rule;

    }





    /**
     * Authorization history
     */


    getDecisions() {


        return this.decisions;

    }





    getRules() {


        return Array.from(

            this.rules.values()

        );

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            rules:

                this.rules.size,


            decisions:

                this.decisions.length,


            allowed:

                this.decisions.filter(

                    item =>

                        item.allowed

                ).length,


            denied:

                this.decisions.filter(

                    item =>

                        !item.allowed

                ).length,


            roles:

                this.roleHierarchy.size


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


            rules:

                this.rules.size,


            decisions:

                this.decisions.length


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

            "KNOWLEDGE_AUTHORIZATION_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeAuthorizationEngine;
