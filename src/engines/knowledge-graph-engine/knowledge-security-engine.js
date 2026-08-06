/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Security Stack
 * File        : knowledge-security-engine.js
 *
 * Build       : BUILD-000909.4
 * Version     : 1.0.0
 *
 * Mission:
 * Protect Knowledge Objects through authentication,
 * authorization, policy enforcement and security monitoring.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeSecurityEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-SECURITY-ENGINE";


        this.name =
            "Knowledge Security Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000909.4";


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


        this.auditEngine =
            options.auditEngine || null;


        this.roles =
            new Map();


        this.identities =
            new Map();


        this.knowledgeObjects =
            new Map();


        this.securityEvents =
            [];



        this.incidents =
            [];



        this.createdAt =
            new Date();


    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "SECURITY_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "SECURITY_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Register security role
     */


    addRole(

        roleId,

        permissions = []

    ){


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
     * Register identity
     */


    addIdentity(

        identityId,

        identity = {}

    ){


        if(!identityId){


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


            type:

                identity.type || "USER",


            active:

                true,


            createdAt:

                new Date()


        };



        this.identities.set(

            identityId,

            record

        );



        return record;

    }





    /**
     * Register knowledge object security profile
     */


    protectKnowledgeObject(

        objectId,

        definition = {}

    ){


        if(!objectId){


            throw new Error(

                "Knowledge object id required."

            );

        }



        const securityProfile = {


            objectId,


            classification:

                definition.classification || "PUBLIC",


            encryption:

                definition.encryption || false,


            allowedRoles:

                definition.allowedRoles || [],


            owner:

                definition.owner || "SYSTEM",


            createdAt:

                new Date()


        };



        this.knowledgeObjects.set(

            objectId,

            securityProfile

        );



        this.recordEvent(

            "KNOWLEDGE_OBJECT_PROTECTED",

            {

                objectId

            }

        );



        return securityProfile;

    }





    /**
     * Main security validation pipeline
     */


    secureAccess(

        request = {}

    ){


        const {

            identityId,

            objectId,

            action,

            context = {}

        } = request;



        let authenticated = true;


        let authorization = null;


        let policy = null;


        let approved = false;



        const identity =

            this.identities.get(

                identityId

            );



        if(identity){


            authenticated =

                identity.active;


        }





        if(this.authorizationEngine){


            authorization =

                this.authorizationEngine.authorize({

                    subject:

                        identityId,


                    role:

                        identity ?

                        identity.role :

                        null,


                    resource:

                        objectId,


                    action

                });


        }



        if(this.policyEngine){


            policy =

                this.policyEngine.execute({

                    subject:

                        identityId,


                    resource:

                        objectId,


                    action,


                    context

                });


        }





        approved =


            authenticated &&


            authorization &&

            authorization.decision === "ALLOW" &&


            policy &&

            policy.decision !== "DENY";





        const result = {


            id:

                this.generateId(),


            identityId,


            objectId,


            action,


            authenticated,


            authorization,


            policy,


            approved,


            timestamp:

                new Date()


        };



        this.securityEvents.push(

            result

        );



        this.recordEvent(

            "SECURITY_ACCESS_DECISION",

            result

        );



        if(this.auditEngine){


            this.auditEngine.record({

                objectId,


                actor:

                    identityId,


                action:

                    "SECURITY_ACCESS",


                result:

                    approved

                    ?

                    "ALLOW"

                    :

                    "DENY"

            });

        }



        return result;

    }





    /**
     * Create security incident
     */


    createIncident(

        incident = {}

    ){


        const record = {


            id:

                this.generateIncidentId(),


            type:

                incident.type || "SECURITY_EVENT",


            severity:

                incident.severity || "MEDIUM",


            description:

                incident.description || "",


            timestamp:

                new Date()


        };



        this.incidents.push(

            record

        );



        return record;

    }





    getSecurityEvents(){


        return this.securityEvents;

    }





    getIncidents(){


        return this.incidents;

    }





    getStatistics(){


        return {


            roles:

                this.roles.size,


            identities:

                this.identities.size,


            protectedObjects:

                this.knowledgeObjects.size,


            securityEvents:

                this.securityEvents.length,


            incidents:

                this.incidents.length


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

            "SECURITY_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "SECURITY_ENGINE_SHUTDOWN"

        );


        return true;

    }





    generateId(){


        return (

            "SECURITY-" +

            Date.now()

        );

    }





    generateIncidentId(){


        return (

            "INCIDENT-" +

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

    KnowledgeSecurityEngine;
