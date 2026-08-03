/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-security-engine.js
 *
 * Build       : BUILD-000410
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


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.roles =
            new Map();


        this.identities =
            new Map();


        this.accessRules =
            new Map();


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





    /**
     * Create security role
     */


    addRole(

        roleId,

        permissions = []

    ) {


        if (

            !roleId

        ) {


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

        identity

    ) {


        if (

            !identityId

        ) {


            throw new Error(

                "Identity id required."

            );

        }



        const record = {


            id:

                identityId,


            name:

                identity.name || "Unknown",


            role:

                identity.role || null,


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
     * Create object access rule
     */


    setAccessRule(

        objectId,

        rule

    ) {


        const record = {


            objectId,


            allowedRoles:

                rule.allowedRoles || [],


            encryption:

                rule.encryption || false,


            classification:

                rule.classification || "PUBLIC"


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
     * Security authorization check
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



        const accessRule =

            this.accessRules.get(

                objectId

            );



        let approved = false;



        if (

            identity &&

            accessRule

        ) {


            approved =

                accessRule.allowedRoles.includes(

                    identity.role

                );

        }



        const event = {


            identityId,


            objectId,


            action,


            approved,


            timestamp:

                new Date()

        };



        this.securityEvents.push(

            event

        );



        this.recordEvent(

            "SECURITY_AUTHORIZATION_CHECKED",

            event

        );



        return event;

    }





    /**
     * Disable identity
     */


    disableIdentity(

        identityId

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if (

            identity

        ) {


            identity.active = false;

        }



        return identity;

    }





    /**
     * Enable identity
     */


    enableIdentity(

        identityId

    ) {


        const identity =

            this.identities.get(

                identityId

            );



        if (

            identity

        ) {


            identity.active = true;

        }



        return identity;

    }





    /**
     * Security event history
     */


    getSecurityEvents() {


        return this.securityEvents;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            roles:

                this.roles.size,


            identities:

                this.identities.size,


            accessRules:

                this.accessRules.size,


            events:

                this.securityEvents.length


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


            roles:

                this.roles.size,


            identities:

                this.identities.size


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

            "KNOWLEDGE_SECURITY_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeSecurityEngine;
