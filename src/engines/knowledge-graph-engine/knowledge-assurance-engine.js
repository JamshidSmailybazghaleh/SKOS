/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-assurance-engine.js
 *
 * Build       : BUILD-000400
 * Version     : 1.0.0
 *
 * Mission:
 * Provide final assurance decision for
 * Knowledge Objects before publication
 * or AI consumption.
 *
 * Combines:
 * - Provenance
 * - Trust
 * - Quality
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeAssuranceEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Assurance Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.records =
            new Map();


        this.counter =
            0;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_ASSURANCE_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Run assurance evaluation
     */


   assure(

        objectId,

        input = {}

    ) {


        if (

            !objectId

        ) {


            throw new Error(

                "Knowledge Object id required."

            );

        }



        const trust =

            input.trust || 0;



        const quality =

            input.quality || 0;



        const provenance =

            input.provenance || 0;



        const score =

            this.calculateAssuranceScore(

                trust,

                quality,

                provenance

            );



        const decision =

            this.getDecision(

                score

            );



        this.counter++;



        const record = {


            id:

                `ASSURANCE-${this.counter}`,


            objectId,


            trust,


            quality,


            provenance,


            score,


            decision,


            createdAt:

                new Date()

        };



        this.records.set(

            objectId,

            record

        );



        this.recordEvent(

            "KNOWLEDGE_ASSURANCE_COMPLETED",

            {

                objectId,

                decision

            }

        );



        this.updateMetric(

            "assuranceEvaluations"

        );



        return record;

    }





    /**
     * Assurance formula
     *
     * Trust        40%
     * Quality      40%
     * Provenance   20%
     */


    calculateAssuranceScore(

        trust,

        quality,

        provenance

    ) {


        return Number(

            (

                trust * 0.40 +

                quality * 0.40 +

                provenance * 0.20

            ).toFixed(2)

        );

    }





    /**
     * Final knowledge decision
     */


    getDecision(

        score

    ) {


        if (

            score >= 0.85

        ) {


            return "APPROVED";

        }



        if (

            score >= 0.65

        ) {


            return "CONDITIONAL";

        }



        if (

            score >= 0.40

        ) {


            return "REVIEW_REQUIRED";

        }



        return "REJECTED";

    }





    /**
     * Retrieve assurance result
     */


    getAssurance(

        objectId

    ) {


        return (

            this.records.get(

                objectId

            )

            ||

            null

        );

    }





    /**
     * Check publication permission
     */


    canPublish(

        objectId

    ) {


        const record =

            this.getAssurance(

                objectId

            );



        if (

            !record

        ) {


            return false;

        }



        return (

            record.decision === "APPROVED"

        );

    }





    /**
     * Remove assurance record
     */


    removeAssurance(

        objectId

    ) {


        return this.records.delete(

            objectId

        );

    }





    /**
     * Return registry
     */


    getRegistry() {


        return Array.from(

            this.records.values()

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


            approved:

                records.filter(

                    item =>

                        item.decision === "APPROVED"

                ).length,


            conditional:

                records.filter(

                    item =>

                        item.decision === "CONDITIONAL"

                ).length,


            review:

                records.filter(

                    item =>

                        item.decision === "REVIEW_REQUIRED"

                ).length,


            rejected:

                records.filter(

                    item =>

                        item.decision === "REJECTED"

                ).length


        };

    }





    clearRegistry() {


        this.records.clear();


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

                this.records.size


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

            "KNOWLEDGE_ASSURANCE_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeAssuranceEngine;
