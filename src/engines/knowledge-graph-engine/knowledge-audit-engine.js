
/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Security Stack
 * File        : knowledge-audit-engine.js
 *
 * Build       : BUILD-000909.5
 * Version     : 1.0.0
 *
 * Mission:
 * Record, trace and analyze all knowledge
 * governance and security activities.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeAuditEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-AUDIT-ENGINE";


        this.name =
            "Knowledge Audit Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000909.5";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.securityEngine =
            options.securityEngine || null;


        this.auditLogs =
            [];


        this.events =
            [];


        this.createdAt =
            new Date();


    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "AUDIT_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "AUDIT_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Create audit record
     */


    record(

        event = {}

    ){


        if(!event){


            throw new Error(

                "Audit event required."

            );

        }



        const record = {


            id:

                this.generateId(),


            objectId:

                event.objectId || null,


            actor:

                event.actor || "SYSTEM",


            actorType:

                event.actorType || "SYSTEM",


            action:

                event.action || "UNKNOWN",


            source:

                event.source || "SKOS",


            policy:

                event.policy || null,


            securityDecision:

                event.result || null,


            metadata:

                event.metadata || {},


            timestamp:

                new Date()


        };



        this.auditLogs.push(

            record

        );



        this.recordEvent(

            "AUDIT_RECORD_CREATED",

            {

                auditId:

                    record.id

            }

        );



        this.updateMetric(

            "auditRecords"

        );



        return record;

    }





    /**
     * Register security event
     */


    registerSecurityEvent(

        event

    ){


        const record = {


            id:

                this.generateEventId(),


            type:

                event.type || "SECURITY_EVENT",


            severity:

                event.severity || "INFO",


            description:

                event.description || "",


            source:

                event.source || "SECURITY_ENGINE",


            timestamp:

                new Date()


        };



        this.events.push(

            record

        );



        this.recordEvent(

            "SECURITY_EVENT_REGISTERED",

            record

        );


        return record;

    }





    /**
     * Search by knowledge object
     */


    findByObject(

        objectId

    ){


        return this.auditLogs.filter(

            item =>

                item.objectId === objectId

        );

    }





    /**
     * Search by actor
     */


    findByActor(

        actor

    ){


        return this.auditLogs.filter(

            item =>

                item.actor === actor

        );

    }





    /**
     * Search by action
     */


    findByAction(

        action

    ){


        return this.auditLogs.filter(

            item =>

                item.action === action

        );

    }





    /**
     * Latest record
     */


    getLatest(){


        if(

            this.auditLogs.length === 0

        ){

            return null;

        }



        return this.auditLogs[

            this.auditLogs.length - 1

        ];

    }





    /**
     * Complete history
     */


    getHistory(){


        return this.auditLogs;

    }





    getSecurityEvents(){


        return this.events;

    }





    /**
     * Statistics
     */


    getStatistics(){


        return {


            records:

                this.auditLogs.length,


            events:

                this.events.length,


            actors:

                new Set(

                    this.auditLogs.map(

                        item => item.actor

                    )

                ).size,


            actions:

                new Set(

                    this.auditLogs.map(

                        item => item.action

                    )

                ).size


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





    clear(){


        this.auditLogs = [];

        this.events = [];


        return true;

    }





    stop(){


        this.status =
            "STOPPED";


        this.recordEvent(

            "AUDIT_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "AUDIT_ENGINE_SHUTDOWN"

        );


        return true;

    }





    generateId(){


        return (

            "AUDIT-" +

            Date.now()

        );

    }





    generateEventId(){


        return (

            "EVENT-" +

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

    KnowledgeAuditEngine;
