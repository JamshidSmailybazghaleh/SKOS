/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-authorization-engine.js
 *
 * Build       : BUILD-000909
 * Version     : 1.0.0
 *
 * Mission:
 * Authorize users, systems and AI agents
 * to access and operate on knowledge resources.
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


        this.build =
            "BUILD-000909";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.authentication =
            options.authentication || null;



        this.rules =
            new Map();



        this.roles =
            new Map();



        this.permissions =
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





    start() {


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_AUTHORIZATION_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Add role
     */


    addRole(

        roleId,

        role

    ) {


        const record = {


            id:

                roleId,


            name:

                role.name || roleId,


            permissions:

                role.permissions || [],


            createdAt:

                new Date()


        };



        this.roles.set(

            roleId,

            record

        );


        return record;

    }





    /**
     * Add permission
     */


    addPermission(

        permissionId,

        permission

    ) {


        const record = {


            id:

                permissionId,


            resource:

                permission.resource || "*",


            action:

                permission.action || "*",


            createdAt:

                new Date()


        };



        this.permissions.set(

            permissionId,

            record

        );


        return record;

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

                rule.subject || "*",


            subjectType:

                rule.subjectType || "USER",


            resource:

                rule.resource || "*",


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
     * Role inheritance
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
     * Authorization decision
     */


    authorize(

        subject,

        resource,

        action,

        context = {}

    ) {


        const matchingRules =


            Array.from(

                this.rules.values()

            )

            .filter(

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




        let decision = {


            subject,


            resource,


            action,


            allowed:

                false,


            reason:

                "NO_MATCHING_RULE",


            timestamp:

                new Date()


        };





        if (

            matchingRules.length

        ) {


            const rule =

                matchingRules.sort(

                    (a,b) =>

                        b.priority -

                        a.priority

                )[0];



            decision.allowed =

                rule.effect === "ALLOW";



            decision.reason =

                rule.effect;


            decision.ruleId =

                rule.id;


        }





        decision.context =

            context;




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
     * Validate access through authentication engine
     */


    authorizeSession(

        sessionId,

        resource,

        action

    ) {


        if (

            this.authentication &&

            !this.authentication.validateSession(

                sessionId

            )

        ) {


            return {


                allowed:

                    false,


                reason:

                    "INVALID_SESSION"


            };

        }



        return this.authorize(

            sessionId,

            resource,

            action

        );


    }





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





    getDecisions() {


        return this.decisions;

    }





    getRules() {


        return Array.from(

            this.rules.values()

        );

    }





    getStatistics() {


        return {


            rules:

                this.rules.size,


            roles:

                this.roles.size,


            permissions:

                this.permissions.size,


            decisions:

                this.decisions.length,


            allowed:

                this.decisions.filter(

                    d => d.allowed

                ).length,


            denied:

                this.decisions.filter(

                    d => !d.allowed

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


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                event,

                metadata

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
