/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Security Stack
 * File        : knowledge-authorization-engine.js
 *
 * Build       : BUILD-000909.2
 * Version     : 1.0.0
 *
 * Mission:
 * Determine whether authenticated identities,
 * systems and AI agents are authorized to
 * access knowledge resources.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeAuthorizationEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-AUTHORIZATION-ENGINE";


        this.name =
            "Knowledge Authorization Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000909.2";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.authenticationEngine =
            options.authenticationEngine || null;


        this.policyEngine =
            options.policyEngine || null;


        this.rules =
            new Map();


        this.roles =
            new Map();


        this.permissions =
            new Map();


        this.decisions =
            [];


        this.createdAt =
            new Date();


    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "AUTHORIZATION_ENGINE_INITIALIZED"

        );


        return true;

    }





    start() {


        this.status =
            "RUNNING";


        this.recordEvent(

            "AUTHORIZATION_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Register role
     */


    registerRole(

        roleId,

        permissions = []

    ) {


        if(!roleId){

            throw new Error(

                "Role id required."

            );

        }



        const role = {


            id:

                roleId,


            permissions,


            createdAt:

                new Date()


        };



        this.roles.set(

            roleId,

            role

        );



        return role;

    }





    /**
     * Register permission
     */


    registerPermission(

        permissionId,

        definition = {}

    ) {


        const permission = {


            id:

                permissionId,


            resource:

                definition.resource || "*",


            action:

                definition.action || "*",


            createdAt:

                new Date()


        };



        this.permissions.set(

            permissionId,

            permission

        );


        return permission;

    }





    /**
     * Add authorization rule
     */


    addRule(

        ruleId,

        rule = {}

    ) {


        if(!ruleId){

            throw new Error(

                "Authorization rule id required."

            );

        }



        const record = {


            id:

                ruleId,


            subject:

                rule.subject || "*",


            role:

                rule.role || "*",


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
     * Main authorization decision
     */


    authorize(

        request = {}

    ) {


        const {

            subject,

            role,

            resource,

            action

        } = request;



        const matchedRules =


            Array.from(

                this.rules.values()

            )

            .filter(

                rule =>


                    rule.enabled &&


                    (

                        rule.subject === "*" ||

                        rule.subject === subject

                    ) &&


                    (

                        rule.role === "*" ||

                        rule.role === role

                    ) &&


                    (

                        rule.resource === "*" ||

                        rule.resource === resource

                    ) &&


                    rule.actions.includes(

                        action

                    )

            );



        let decision =
            "DENY";


        let reason =
            "No matching authorization rule";



        if(

            matchedRules.length > 0

        ){


            const rule =

                matchedRules.sort(

                    (a,b)=>

                        b.priority -

                        a.priority

                )[0];



            decision =

                rule.effect;



            reason =

                "Authorization rule matched";


        }





        const result = {


            id:

                this.generateId(),


            subject,


            role,


            resource,


            action,


            decision,


            reason,


            timestamp:

                new Date()


        };



        this.decisions.push(

            result

        );



        this.recordEvent(

            "AUTHORIZATION_DECISION_CREATED",

            result

        );



        return result;

    }





    /**
     * Execute authorization request
     */


    execute(

        request = {}

    ) {


        return this.authorize(

            request

        );

    }





    disableRule(

        ruleId

    ){


        const rule =

            this.rules.get(

                ruleId

            );


        if(rule){

            rule.enabled = false;

        }


        return rule;

    }





    enableRule(

        ruleId

    ){


        const rule =

            this.rules.get(

                ruleId

            );


        if(rule){

            rule.enabled = true;

        }


        return rule;

    }





    getRules(){


        return Array.from(

            this.rules.values()

        );

    }





    getDecisions(){


        return this.decisions;

    }





    getStatistics(){


        return {


            roles:

                this.roles.size,


            permissions:

                this.permissions.size,


            rules:

                this.rules.size,


            decisions:

                this.decisions.length,


            allowed:

                this.decisions.filter(

                    d =>

                    d.decision === "ALLOW"

                ).length,


            denied:

                this.decisions.filter(

                    d =>

                    d.decision === "DENY"

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

            "AUTHORIZATION_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "AUTHORIZATION_ENGINE_SHUTDOWN"

        );


        return true;

    }





    generateId(){


        return (

            "AUTHZ-" +

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

    KnowledgeAuthorizationEngine;
