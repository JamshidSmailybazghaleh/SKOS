/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-provenance-engine.js
 *
 * Build       : BUILD-000394
 * Version     : 1.0.0
 *
 * Mission:
 * Track origin, ownership, validation,
 * trust and evidence of Knowledge Objects.
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
            [];


        this.counter =
            0;

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
     * Register knowledge provenance
     */


    registerProvenance(

        objectId,

        source,

        evidence = {},

        metadata = {}

    ) {


        if (

            !objectId

        ) {


            throw new Error(

                "Knowledge Object id required."

            );

        }



        this.counter++;



        const record = {


            id:

                `PROVENANCE-${this.counter}`,


            objectId,


            source,


            evidence,


            metadata,


            trustScore:

                0,


            validations:

                [],


            createdAt:

                new Date()

        };



        this.records.push(

            record

        );



        this.recordEvent(

            "PROVENANCE_CREATED",

            {

                id:

                    record.id

            }

        );



        this.updateMetric(

            "provenanceCreated"

        );



        return record;

    }





    /**
     * Add validation evidence
     */


    addValidation(

        provenanceId,

        validation

    ) {


        const record =

            this.records.find(

                item =>

                    item.id === provenanceId

            );



        if (

            !record

        ) {


            throw new Error(

                "Provenance record not found."

            );

        }



        const item = {


            validator:

                validation.validator || "SYSTEM",


            result:

                validation.result || "UNKNOWN",


            details:

                validation.details || {},


            timestamp:

                new Date()

        };



        record.validations.push(

            item

        );



        this.calculateTrustScore(

            record

        );



        this.recordEvent(

            "PROVENANCE_VALIDATED",

            {

                provenanceId

            }

        );



        return item;

    }





    /**
     * Calculate trust score
     */


    calculateTrustScore(

        record

    ) {


        const validations =

            record.validations.length;



        if (

            validations === 0

        ) {


            record.trustScore = 0;


            return 0;

        }



        const approved =

            record.validations.filter(

                item =>

                    item.result === "APPROVED"

            ).length;



        record.trustScore =

            approved /

            validations;



        return record.trustScore;

    }





    /**
     * Get provenance
     */


    getProvenance(

        objectId

    ) {


        return (

            this.records.find(

                item =>

                    item.objectId === objectId

            )

            ||

            null

        );

    }





    /**
     * Check trust
     */


    getTrustScore(

        objectId

    ) {


        const record =

            this.getProvenance(

                objectId

            );



        if (

            !record

        ) {


            return 0;

        }



        return record.trustScore;

    }





    /**
     * Complete provenance registry
     */


    getRegistry() {


        return this.records;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            records:

                this.records.length,


            validations:

                this.records.reduce(

                    (sum, item) =>

                        sum +

                        item.validations.length,

                    0

                )

        };

    }





    clearRegistry() {


        this.records = [];


        this.counter = 0;


        return true;

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

                this.records.length


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

            "KNOWLEDGE_PROVENANCE_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeProvenanceEngine;
