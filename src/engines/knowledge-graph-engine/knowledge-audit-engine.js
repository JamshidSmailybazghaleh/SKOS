/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-audit-engine.js
 *
 * Build       : BUILD-000408
 * Version     : 1.0.0
 *
 * Mission:
 * Track, record and analyze all knowledge
 * governance activities and changes.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeAuditEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Audit Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.auditLogs =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_AUDIT_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Record audit event
     */


    record(

        event

    ) {


        if (

            !event

        ) {


            throw new Error(

                "Audit event required."

            );

        }



        const log = {


            id:

                this.generateId(),


            objectId:

                event.objectId || null,


            actor:

                event.actor || "SYSTEM",


            action:

                event.action || "UNKNOWN",


            source:

                event.source || "SKOS",


            policy:

                event.policy || null,


            result:

                event.result || null,


            metadata:

                event.metadata || {},


            timestamp:

                new Date()

        };



        this.auditLogs.push(

            log

        );



        this.recordEvent(

            "AUDIT_RECORD_CREATED",

            {

                id:

                    log.id

            }

        );



        this.updateMetric(

            "auditRecords"

        );



        return log;

    }





    /**
     * Generate audit identifier
     */


    generateId() {


        return (

            "AUDIT-" +

            Date.now()

        );

    }





    /**
     * Get audit by object
     */


    getByObject(

        objectId

    ) {


        return this.auditLogs.filter(

            log =>

                log.objectId === objectId

        );

    }





    /**
     * Get audit by actor
     */


    getByActor(

        actor

    ) {


        return this.auditLogs.filter(

            log =>

                log.actor === actor

        );

    }





    /**
     * Get audit by action
     */


    getByAction(

        action

    ) {


        return this.auditLogs.filter(

            log =>

                log.action === action

        );

    }





    /**
     * Latest audit record
     */


    getLatest() {


        if (

            this.auditLogs.length === 0

        ) {


            return null;

        }



        return this.auditLogs[

            this.auditLogs.length - 1

        ];

    }





    /**
     * Full audit history
     */


    getHistory() {


        return this.auditLogs;

    }





    /**
     * Remove audit records
     */


    clearHistory() {


        this.auditLogs =

            [];


        return true;

    }





    /**
     * Audit statistics
     */


    getStatistics() {


        return {


            total:

                this.auditLogs.length,


            actors:

                new Set(

                    this.auditLogs.map(

                        log => log.actor

                    )

                ).size,


            actions:

                new Set(

                    this.auditLogs.map(

                        log => log.action

                    )

                ).size


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


            records:

                this.auditLogs.length


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

            "KNOWLEDGE_AUDIT_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeAuditEngine;
