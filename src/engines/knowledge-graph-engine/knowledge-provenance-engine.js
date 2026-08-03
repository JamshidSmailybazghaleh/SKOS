/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-provenance-engine.js
 *
 * Build       : BUILD-000424
 * Version     : 1.0.0
 *
 * Mission:
 * Track origin, ownership, transformation history,
 * and lifecycle provenance of knowledge objects.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeProvenanceEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Provenance Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.records =
            new Map();


        this.lineage =
            [];


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_PROVENANCE_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Register knowledge origin
     */


    registerOrigin(

        knowledgeId,

        origin

    ) {


        if (

            !knowledgeId

        ) {


            throw new Error(

                "Knowledge id required."

            );

        }



        const record = {


            knowledgeId,


            source:

                origin.source || "UNKNOWN",


            creator:

                origin.creator || null,


            type:

                origin.type || "DOCUMENT",


            createdAt:

                origin.createdAt || new Date(),


            version:

                origin.version || "1.0.0",


            verified:

                false

        };



        this.records.set(

            knowledgeId,

            record

        );



        this.addHistory(

            "ORIGIN_REGISTERED",

            record

        );



        return record;

    }





    /**
     * Verify provenance
     */


    verifyProvenance(

        knowledgeId

    ) {


        const record =

            this.records.get(

                knowledgeId

            );



        if (

            record

        ) {


            record.verified = true;

        }



        this.addHistory(

            "PROVENANCE_VERIFIED",

            {

                knowledgeId

            }

        );



        return record;

    }





    /**
     * Add transformation lineage
     */


    addTransformation(

        knowledgeId,

        transformation

    ) {


        const event = {


            knowledgeId,


            action:

                transformation.action || "UPDATE",


            actor:

                transformation.actor || null,


            previousVersion:

                transformation.previousVersion || null,


            newVersion:

                transformation.newVersion || null,


            timestamp:

                new Date()

        };



        this.lineage.push(

            event

        );



        this.addHistory(

            "TRANSFORMATION_RECORDED",

            event

        );



        return event;

    }





    /**
     * Get knowledge lineage
     */


    getLineage(

        knowledgeId

    ) {


        return this.lineage.filter(

            item =>

                item.knowledgeId === knowledgeId

        );

    }





    /**
     * Update provenance record
     */


    updateProvenance(

        knowledgeId,

        updates

    ) {


        const record =

            this.records.get(

                knowledgeId

            );



        if (

            record

        ) {


            Object.assign(

                record,

                updates

            );

        }



        this.addHistory(

            "PROVENANCE_UPDATED",

            {

                knowledgeId,

                updates

            }

        );



        return record;

    }





    getRecord(

        knowledgeId

    ) {


        return this.records.get(

            knowledgeId

        );

    }





    getRecords() {


        return Array.from(

            this.records.values()

        );

    }





    getHistory() {


        return this.history;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            knowledgeObjects:

                this.records.size,


            verified:

                this.getRecords()

                    .filter(

                        item =>

                            item.verified

                    )

                    .length,


            lineageEvents:

                this.lineage.length,


            historyEvents:

                this.history.length


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

                this.records.size,


            lineage:

                this.lineage.length


        };

    }





    addHistory(

        event,

        data = {}

    ) {


        const record = {


            event,


            data,


            timestamp:

                new Date()

        };



        this.history.push(

            record

        );



        this.recordEvent(

            event,

            data

        );

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

            "KNOWLEDGE_PROVENANCE_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeProvenanceEngine;
