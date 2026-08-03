/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-trust-engine.js
 *
 * Build       : BUILD-000396
 * Version     : 1.0.0
 *
 * Mission:
 * Evaluate and manage trust level of
 * Knowledge Objects using provenance,
 * evidence and validation signals.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeTrustEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Trust Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.trustRecords =
            new Map();

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_TRUST_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Evaluate knowledge trust
     */


    evaluate(

        objectId,

        signals = {}

    ) {


        if (

            !objectId

        ) {


            throw new Error(

                "Knowledge Object id required."

            );

        }



        const score =

            this.calculateScore(

                signals

            );



        const level =

            this.getTrustLevel(

                score

            );



        const record = {


            objectId,


            score,


            level,


            signals,


            updatedAt:

                new Date()

        };



        this.trustRecords.set(

            objectId,

            record

        );



        this.recordEvent(

            "KNOWLEDGE_TRUST_EVALUATED",

            {

                objectId,


                score

            }

        );



        this.updateMetric(

            "trustEvaluations"

        );



        return record;

    }





    /**
     * Calculate trust score
     *
     * Formula:
     * Provenance 40%
     * Evidence   30%
     * Validation 30%
     */


    calculateScore(

        signals

    ) {


        const provenance =

            signals.provenance || 0;



        const evidence =

            signals.evidence || 0;



        const validation =

            signals.validation || 0;



        return Number(

            (

                provenance * 0.4 +

                evidence * 0.3 +

                validation * 0.3

            ).toFixed(2)

        );

    }





    /**
     * Trust classification
     */


    getTrustLevel(

        score

    ) {


        if (

            score >= 0.85

        ) {


            return "HIGH";

        }



        if (

            score >= 0.60

        ) {


            return "MEDIUM";

        }



        if (

            score >= 0.30

        ) {


            return "LOW";

        }



        return "UNTRUSTED";

    }





    /**
     * Retrieve trust record
     */


    getTrust(

        objectId

    ) {


        return (

            this.trustRecords.get(

                objectId

            )

            ||

            null

        );

    }





    /**
     * Check trusted knowledge
     */


    isTrusted(

        objectId,

        threshold = 0.85

    ) {


        const record =

            this.getTrust(

                objectId

            );



        if (

            !record

        ) {


            return false;

        }



        return (

            record.score >= threshold

        );

    }





    /**
     * Remove trust record
     */


    removeTrust(

        objectId

    ) {


        return this.trustRecords.delete(

            objectId

        );

    }





    /**
     * Return complete trust registry
     */


    getRegistry() {


        return Array.from(

            this.trustRecords.values()

        );

    }





    /**
     * Statistics
     */


    getStatistics() {


        const records =

            this.getRegistry();



        return {


            total:

                records.length,


            high:

                records.filter(

                    item =>

                        item.level === "HIGH"

                ).length,


            medium:

                records.filter(

                    item =>

                        item.level === "MEDIUM"

                ).length,


            low:

                records.filter(

                    item =>

                        item.level === "LOW"

                ).length


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

                this.trustRecords.size


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

            "KNOWLEDGE_TRUST_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeTrustEngine;
