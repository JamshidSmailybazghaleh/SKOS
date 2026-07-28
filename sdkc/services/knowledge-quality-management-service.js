/*
====================================================
SKOS Mission Control

Knowledge Quality Management Service

BUILD-000407

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class KnowledgeQualityManagementService {


    constructor() {


        this.assessments = new Map();

        this.criteria = [];

        this.reviews = [];

        this.initialized = false;


    }





    async initialize() {


        Logger.info(

            "Knowledge Quality Management Service Initializing..."

        );


        this.registerDefaultCriteria();


        this.initialized = true;


        return true;

    }





    registerCriteria(criteria) {


        this.criteria.push({


            id:

                "QCR-" + Date.now(),


            name:

                criteria.name,


            weight:

                criteria.weight || 1,


            description:

                criteria.description || ""


        });


    }





    evaluateKnowledge(

        knowledgeId,

        metrics

    ) {


        const score =

            this.calculateScore(

                metrics

            );



        const assessment = {


            qualityId:

                "QLT-" + Date.now(),


            knowledgeId,


            score,


            grade:

                this.calculateGrade(

                    score

                ),


            status:

                score >= 70

                ?

                "APPROVED"

                :

                "REVIEW_REQUIRED",


            createdAt:

                new Date().toISOString()


        };



        this.assessments.set(

            knowledgeId,

            assessment

        );



        AuditService.record(

            "KNOWLEDGE_QUALITY_EVALUATED",

            assessment

        );



        EventBusService.publish(

            "KNOWLEDGE_QUALITY_UPDATED",

            assessment,

            "knowledge-quality-management-service"

        );



        return assessment;

    }





    calculateScore(metrics) {


        const values = Object.values(

            metrics

        );



        return Math.round(

            values.reduce(

                (a,b)=>a+b,

                0

            )

            /

            values.length

        );

    }





    calculateGrade(score) {


        if(score >= 90)

            return "A";


        if(score >= 80)

            return "B";


        if(score >= 70)

            return "C";


        return "D";

    }





    requestReview(

        knowledgeId,

        reason

    ) {


        const review = {


            reviewId:

                "KQR-" + Date.now(),


            knowledgeId,


            reason,


            status:

                "PENDING",


            createdAt:

                new Date().toISOString()

        };



        this.reviews.push(

            review

        );



        return review;

    }





    approveReview(

        reviewId

    ) {


        const review =

            this.reviews.find(

                item =>

                item.reviewId === reviewId

            );



        if(review)

            review.status =

                "APPROVED";



        return review;

    }





    getQuality(

        knowledgeId

    ) {


        return this.assessments.get(

            knowledgeId

        );

    }





    listAssessments() {


        return Array.from(

            this.assessments.values()

        );

    }





    registerDefaultCriteria() {


        this.registerCriteria({

            name:

                "Accuracy",

            weight:

                30

        });



        this.registerCriteria({

            name:

                "Completeness",

            weight:

                25

        });



        this.registerCriteria({

            name:

                "Reliability",

            weight:

                25

        });



        this.registerCriteria({

            name:

                "Freshness",

            weight:

                20

        });


    }





    status() {


        return {


            initialized:

                this.initialized,


            assessments:

                this.assessments.size,


            reviews:

                this.reviews.length,


            criteria:

                this.criteria.length


        };

    }


}



window.KnowledgeQualityManagementService =

    new KnowledgeQualityManagementService();



Object.freeze(

    window.KnowledgeQualityManagementService

);
