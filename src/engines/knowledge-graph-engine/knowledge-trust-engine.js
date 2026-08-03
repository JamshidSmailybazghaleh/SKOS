/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-trust-engine.js
 *
 * Build       : BUILD-000425
 * Version     : 1.0.0
 *
 * Mission:
 * Evaluate and manage trust levels of knowledge objects
 * based on provenance, verification, quality signals,
 * and confidence indicators.
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


        this.evaluations =
            [];


        this.history =
            [];

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
     * Create trust record
     */


    createTrustRecord(

        knowledgeId,

        data = {}

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


            provenanceScore:

                data.provenanceScore || 0,


            qualityScore:

                data.qualityScore || 0,


            verificationScore:

                data.verificationScore || 0,


            confidence:

                data.confidence || 0,


            trustScore:

                0,


            level:

                "UNKNOWN",


            createdAt:

                new Date()

        };



        this.trustRecords.set(

            knowledgeId,

            record

        );



        this.calculateTrust(

            knowledgeId

        );



        this.addHistory(

            "TRUST_RECORD_CREATED",

            record

        );



        return record;

    }





    /**
     * Calculate trust score
     */


    calculateTrust(

        knowledgeId

    ) {


        const record =

            this.trustRecords.get(

                knowledgeId

            );



        if (

            !record

        ) {


            return null;

        }



        record.trustScore =


            (

                record.provenanceScore *

                0.35

            )

            +

            (

                record.qualityScore *

                0.30

            )

            +

            (

                record.verificationScore *

                0.25

            )

            +

            (

                record.confidence *

                0.10

            );



        record.level =

            this.getTrustLevel(

                record.trustScore

            );



        this.evaluations.push(

            {

                knowledgeId,


                score:

                    record.trustScore,


                level:

                    record.level,


                timestamp:

                    new Date()

            }

        );



        return record;

    }





    /**
     * Determine trust level
     */


    getTrustLevel(

        score

    ) {


        if (

            score >= 90

        ) {


            return "VERY_HIGH";

        }


        if (

            score >= 75

        ) {


            return "HIGH";

        }


        if (

            score >= 50

        ) {


            return "MEDIUM";

        }


        if (

            score >= 25

        ) {


            return "LOW";

        }


        return "UNTRUSTED";

    }





    /**
     * Update trust signals
     */


    updateSignals(

        knowledgeId,

        signals

    ) {


        const record =

            this.trustRecords.get(

                knowledgeId

            );



        if (

            record

        ) {


            Object.assign(

                record,

                signals

            );


            this.calculateTrust(

                knowledgeId

            );

        }



        this.addHistory(

            "TRUST_SIGNALS_UPDATED",

            {

                knowledgeId,

                signals

            }

        );



        return record;

    }





    /**
     * Get trust record
     */


    getTrustRecord(

        knowledgeId

    ) {


        return this.trustRecords.get(

            knowledgeId

        );

    }





    getTrustRecords() {


        return Array.from(

            this.trustRecords.values()

        );

    }





    getEvaluations() {


        return this.evaluations;

    }





    /**
     * Statistics
     */


    getStatistics() {


        const records =

            this.getTrustRecords();



        return {


            knowledgeObjects:

                records.length,


            veryHigh:

                records.filter(

                    item =>

                        item.level === "VERY_HIGH"

                ).length,


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

                ).length,


            untrusted:

                records.filter(

                    item =>

                        item.level === "UNTRUSTED"

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

                this.trustRecords.size,


            evaluations:

                this.evaluations.length


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

            "KNOWLEDGE_TRUST_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeTrustEngine;
