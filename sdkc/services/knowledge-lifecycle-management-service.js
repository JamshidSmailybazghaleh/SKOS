/*
====================================================
SKOS Mission Control

Knowledge Lifecycle Management Service

BUILD-000406

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class KnowledgeLifecycleManagementService {


    constructor() {


        this.knowledgeObjects = new Map();

        this.transitions = [];

        this.reviews = [];

        this.initialized = false;


    }





    async initialize() {


        Logger.info(

            "Knowledge Lifecycle Management Service Initializing..."

        );


        this.registerDefaultKnowledge();


        this.initialized = true;


        return true;

    }





    registerKnowledge(object) {


        const record = {


            knowledgeId:

                "KNW-" + Date.now(),


            title:

                object.title,


            type:

                object.type || "KNOWLEDGE_OBJECT",


            version:

                "1.0.0",


            state:

                "CREATED",


            owner:

                object.owner || "SKOS",


            createdAt:

                new Date().toISOString()


        };



        this.knowledgeObjects.set(

            record.knowledgeId,

            record

        );



        this.recordTransition(

            record.knowledgeId,

            "CREATED"

        );



        AuditService.record(

            "KNOWLEDGE_REGISTERED",

            record

        );



        return record;

    }





    transition(

        knowledgeId,

        newState

    ) {


        const knowledge =

            this.knowledgeObjects.get(

                knowledgeId

            );



        if (!knowledge) {

            throw new Error(

                "Knowledge Object Not Found."

            );

        }



        const oldState =

            knowledge.state;



        knowledge.state =

            newState;



        knowledge.version =

            this.incrementVersion(

                knowledge.version

            );



        this.recordTransition(

            knowledgeId,

            newState

        );



        EventBusService.publish(

            "KNOWLEDGE_STATE_CHANGED",

            {

                knowledgeId,

                oldState,

                newState

            },

            "knowledge-lifecycle-management-service"

        );



        return knowledge;

    }





    reviewKnowledge(

        knowledgeId,

        reviewer

    ) {


        const review = {


            reviewId:

                "REV-" + Date.now(),


            knowledgeId,


            reviewer,


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



        if (review) {


            review.status =

                "APPROVED";

        }



        return review;

    }





    recordTransition(

        knowledgeId,

        state

    ) {


        this.transitions.push({


            knowledgeId,


            state,


            timestamp:

                new Date().toISOString()


        });

    }





    incrementVersion(version) {


        const parts =

            version.split(".");


        parts[2] =

            Number(parts[2]) + 1;



        return parts.join(".");

    }





    getKnowledge(

        knowledgeId

    ) {


        return this.knowledgeObjects.get(

            knowledgeId

        );

    }





    listKnowledge() {


        return Array.from(

            this.knowledgeObjects.values()

        );

    }





    registerDefaultKnowledge() {


        this.registerKnowledge({

            title:

                "SKOS Core Knowledge Model",

            type:

                "FOUNDATION_KNOWLEDGE"

        });


    }





    status() {


        return {


            initialized:

                this.initialized,


            knowledgeObjects:

                this.knowledgeObjects.size,


            transitions:

                this.transitions.length,


            reviews:

                this.reviews.length

        };

    }


}



window.KnowledgeLifecycleManagementService =

    new KnowledgeLifecycleManagementService();



Object.freeze(

    window.KnowledgeLifecycleManagementService

);
