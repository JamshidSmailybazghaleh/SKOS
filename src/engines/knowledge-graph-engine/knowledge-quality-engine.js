/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-quality-engine.js
 *
 * Build       : BUILD-000398
 * Version     : 1.0.0
 *
 * Mission:
 * Evaluate knowledge quality based on
 * completeness, accuracy, consistency
 * and freshness indicators.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeQualityEngine {


    constructor(options = {}) {


        this.name =
            "Knowledge Quality Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.records =
            new Map();

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_QUALITY_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Evaluate knowledge quality
     */


    evaluate(

        objectId,

        indicators = {}

    ) {


        if (

            !objectId

        ) {


            throw new Error(

                "Knowledge Object id required."

            );

        }



        const score =

            this.calculateQualityScore(

                indicators

            );



        const level =

            this.getQualityLevel(

                score

            );



        const record = {


            objectId,


            score,


            level,


            indicators,


            updatedAt:

                new Date()

        };



        this.records.set(

            objectId,

            record

        );



        this.recordEvent(

            "KNOWLEDGE_QUALITY_EVALUATED",

            {

                objectId,


                score

            }

        );



        this.updateMetric(

            "qualityEvaluations"

        );



        return record;

    }





    /**
     * Quality score calculation
     *
     * Completeness 30%
     * Accuracy     30%
     * Consistency  25%
     * Freshness    15%
     */


    calculateQualityScore(

        indicators

    ) {


        const completeness =

            indicators.completeness || 0;



        const accuracy =

            indicators.accuracy || 0;



        const consistency =

            indicators.consistency || 0;



        const freshness =

            indicators.freshness || 0;



        return Number(

            (

                completeness * 0.30 +

                accuracy * 0.30 +

                consistency * 0.25 +

                freshness * 0.15

            ).toFixed(2)

        );

    }





    /**
     * Quality classification
     */


    getQualityLevel(

        score

    ) {


        if (

            score >= 0.85

        ) {


            return "EXCELLENT";

        }



        if (

            score >= 0.65

        ) {


            return "GOOD";

        }



        if (

            score >= 0.40

        ) {


            return "FAIR";

        }



        return "POOR";

    }





    /**
     * Retrieve quality record
     */


    getQuality(

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
     * Check quality threshold
     */


    isHighQuality(

        objectId,

        threshold = 0.85

    ) {


        const record =

            this.getQuality(

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
     * Remove quality record
     */


    removeQuality(

        objectId

    ) {


        return this.records.delete(

            objectId

        );

    }





    /**
     * Return quality registry
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


            excellent:

                records.filter(

                    item =>

                        item.level === "EXCELLENT"

                ).length,


            good:

                records.filter(

                    item =>

                        item.level === "GOOD"

                ).length,


            fair:

                records.filter(

                    item =>

                        item.level === "FAIR"

                ).length,


            poor:

                records.filter(

                    item =>

                        item.level === "POOR"

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

            "KNOWLEDGE_QUALITY_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeQualityEngine;
