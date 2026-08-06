/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-security-engine.js
 *
 * Build       : BUILD-000909
 * Version     : 1.0.0
 *
 * Mission:
 * Protect Knowledge Objects through access control,
 * identity management and security decisions.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeSecurityEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Security Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000909";


        this.status =
            "CREATED";



        this.monitoring =
            options.monitoring || null;



        this.authenticationEngine =
            options.authenticationEngine || null;



        this.authorizationEngine =
            options.authorizationEngine || null;



        this.policyEngine =
            options.policyEngine || null;



        this.roles =
            new Map();



        this.identities =
            new Map();



        this.accessRules =
            new Map();



        this.securityDecisions =
            [];



        this.securityEvents =
            [];

    }







    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_SECURITY_ENGINE_INITIALIZED"

        );


        return true;

    }







    start() {


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_SECURITY_ENGINE_STARTED"

        );


        return true;

    }







    stop() {


        this.status =
            "STOPPED";


        this.recordEvent(

            "KNOWLEDGE_SECURITY_ENGINE_STOPPED"

        );


        return true;

    }







    /**
     * Create security role
     */


    addRole(

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



        this.recordEvent(

            "SECURITY_ROLE_CREATED",

            {

                roleId

            }

        );



        return role;

    }







    /**
     * Register identity
     */


    addIdentity(

        identityId,

        identity = {}

    ) {


        if(!identityId){


            throw new Error(

                "Identity id required."

            );

        }



        const record = {


            id:

                identityId,


            name:

                identity.name ||

                "Unknown",



            role:

                identity.role ||

                null,



            type:

                identity.type ||

                "USER",



            active:

                true,



            createdAt:

                new Date()

        };



        this.identities.set(

            identityId,

            record

        );



        this.recordEvent(

            "IDENTITY_REGISTERED",

            {

                identityId

            }

        );



        return record;

    }







    /**
     * Define knowledge object security policy
     */


    setAccessRule(

        objectId,

        rule = {}

    ) {


        const record = {


            objectId,


            allowedRoles:

                rule.allowedRoles || [],



            allowedActions:

                rule.allowedActions ||

                [

                    "READ"

                ],



            encryption:

                Boolean(

                    rule.encryption

                ),



            classification:

                rule.classification ||

                "PUBLIC",



            createdAt:

                new Date()

        };



        this.accessRules.set(

            objectId,

            record

        );



        this.recordEvent(

            "ACCESS_RULE_CREATED",

            {

                objectId

            }

        );



        return record;

    }







    /**
     * Main security decision engine
     */


    authorize(

        identityId,

        objectId,

        action

    ) {



        const identity =

            this.identities.get(

                identityId

            );



        const rule =

            this.accessRules.get(

                objectId

            );



        let approved = false;



        let reason =

            "ACCESS_DENIED";





        if(

            identity &&

            identity.active &&

            rule

        ){



            const roleAllowed =

                rule.allowedRoles.includes(

                    identity.role

                );



            const actionAllowed =

                rule.allowedActions.includes(

                    action

                );



            approved =

                roleAllowed &&

                actionAllowed;



            reason =

                approved

                ?

                "ACCESS_GRANTED"

                :

                "INSUFFICIENT_PERMISSION";

        }





        const decision = {


            identityId,


            objectId,


            action,


            approved,


            reason,


            classification:

                rule

                ?

                rule.classification

                :

                "UNKNOWN",



            timestamp:

                new Date()

        };





        this.securityDecisions.push(

            decision

        );



        this.securityEvents.push(

            decision

        );



        this.recordEvent(

            "SECURITY_DECISION_CREATED",

            decision

        );



        this.updateMetric(

            "securityDecisions"

        );



        return decision;

    }







    /**
     * Register threat/security event
     */


    registerSecurityEvent(

        event

    ) {


        const record = {


            ...event,


            timestamp:

                new Date()

        };



        this.securityEvents.push(

            record

        );



        this.recordEvent(

            "SECURITY_EVENT_REGISTERED",

            record

        );



        return record;

    }







    disableIdentity(

        identityId

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if(identity){


            identity.active = false;

        }



        return identity;

    }







    enableIdentity(

        identityId

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if(identity){


            identity.active = true;

        }



        return identity;

    }







    getSecurityEvents(){


        return this.securityEvents;

    }







    getDecisions(){


        return this.securityDecisions;

    }







    getStatistics(){


        return {


            roles:

                this.roles.size,


            identities:

                this.identities.size,


            accessRules:

                this.accessRules.size,


            decisions:

                this.securityDecisions.length,


            events:

                this.securityEvents.length


        };

    }







    getStatus(){


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







    shutdown(){


        this.status =

            "SHUTDOWN";



        this.recordEvent(

            "KNOWLEDGE_SECURITY_ENGINE_SHUTDOWN"

        );



        return true;

    }


}





module.exports =

    KnowledgeSecurityEngine;
