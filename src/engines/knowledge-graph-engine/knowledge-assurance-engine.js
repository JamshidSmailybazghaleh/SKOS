/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : knowledge-assurance-engine.js
 *
 * Build       : BUILD-000428
 * Version     : 1.0.0
 *
 * Mission:
 * Provide assurance evaluation for knowledge objects
 * through validation, reliability, completeness,
 * and operational readiness indicators.
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


        this.assuranceRecords =
            new Map();


        this.assessments =
            [];


        this.history =
            [];

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
     * Create assurance record
     */


    createAssuranceRecord(

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


            validation:

                data.validation || 0,


            reliability:

                data.reliability || 0,


            completeness:

                data.completeness || 0,


            operationalReadiness:

                data.operationalReadiness || 0,


            auditStatus:

                data.auditStatus || "PENDING",


            assuranceScore:

                0,


            level:

                "UNKNOWN",


            createdAt:

                new Date()

        };



        this.assuranceRecords.set(

            knowledgeId,

            record

        );



        this.calculateAssurance(

            knowledgeId

        );



        this.addHistory(

            "ASSURANCE_RECORD_CREATED",

            record

        );



        return record;

    }





    /**
     * Calculate assurance score
     */


    calculateAssurance(

        knowledgeId

    ) {


        const record =

            this.assuranceRecords.get(

                knowledgeId

            );



        if (

            !record

        ) {


            return null;

        }



        record.assuranceScore =


            (

                record.validation *

                0.30

            )

            +

            (

                record.reliability *

                0.30

            )

            +

            (

                record.completeness *

                0.20

            )

            +

            (

                record.operationalReadiness *

                0.20

            );



        record.level =

            this.getAssuranceLevel(

                record.assuranceScore

            );



        this.assessments.push(

            {

                knowledgeId,


                score:

                    record.assuranceScore,


                level:

                    record.level,


                timestamp:

                    new Date()

            }

        );



        return record;

    }





    /**
     * Determine assurance level
     */


    getAssuranceLevel(

        score

    ) {


        if (

            score >= 90

        ) {


            return "CERTIFIED";

        }


        if (

            score >= 75

        ) {


            return "ASSURED";

        }


        if (

            score >= 50

        ) {


            return "CONDITIONALLY_ASSURED";

        }


        if (

            score >= 25

        ) {


            return "REVIEW_REQUIRED";

        }



        return "NOT_ASSURED";

    }





    /**
     * Update assurance indicators
     */


    updateIndicators(

        knowledgeId,

        indicators

    ) {


        const record =

            this.assuranceRecords.get(

                knowledgeId

            );



        if (

            record

        ) {


            Object.assign(

                record,

                indicators

            );



            this.calculateAssurance(

                knowledgeId

            );

        }



        this.addHistory(

            "ASSURANCE_INDICATORS_UPDATED",

            {

                knowledgeId,

                indicators

            }

        );



        return record;

    }





    /**
     * Approve knowledge object
     */


    certify(

        knowledgeId

    ) {


        const record =

            this.assuranceRecords.get(

                knowledgeId

            );



        if (

            record

        ) {


            record.auditStatus =

                "CERTIFIED";


            record.assuranceScore =

                Math.max(

                    record.assuranceScore,

                    90

                );


            record.level =

                "CERTIFIED";

        }



        this.addHistory(

            "KNOWLEDGE_CERTIFIED",

            {

                knowledgeId

            }

        );



        return record;

    }





    getAssuranceRecord(

        knowledgeId

    ) {


        return this.assuranceRecords.get(

            knowledgeId

        );

    }





    getRecords() {


        return Array.from(

            this.assuranceRecords.values()

        );

    }





    getAssessments() {


        return this.assessments;

    }





    /**
     * Statistics
     */


    getStatistics() {


        const records =

            this.getRecords();



        return {


            knowledgeObjects:

                records.length,


            certified:

                records.filter(

                    item =>

                        item.level === "CERTIFIED"

                ).length,


            assured:

                records.filter(

                    item =>

                        item.level === "ASSURED"

                ).length,


            conditional:

                records.filter(

                    item =>

                        item.level === "CONDITIONALLY_ASSURED"

                ).length,


            reviewRequired:

                records.filter(

                    item =>

                        item.level === "REVIEW_REQUIRED"

                ).length,


            notAssured:

                records.filter(

                    item =>

                        item.level === "NOT_ASSURED"

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

                this.assuranceRecords.size,


            assessments:

                this.assessments.length


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

            "KNOWLEDGE_ASSURANCE_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    KnowledgeAssuranceEngine;
