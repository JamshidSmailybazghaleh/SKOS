/*
====================================================
SKOS Mission Control

Knowledge Impact Management Service

BUILD-000425

Version:
1.0.0

Status:
ACTIVE
====================================================
*/


class KnowledgeImpactManagementService {


    constructor() {


        this.impacts = [];

        this.metrics = [];

        this.adoptions = [];

        this.outcomes = [];

        this.initialized = false;


    }





    async initialize() {


        Logger.info(

            "Knowledge Impact Management Service Initializing..."

        );


        this.registerDefaultMetrics();


        this.initialized = true;


        return true;

    }





    registerMetric(data) {


        const metric = {


            metricId:

                "MET-" + Date.now(),


            name:

                data.name,


            category:

                data.category || "GENERAL",


            weight:

                data.weight || 1,


            description:

                data.description || ""


        };



        this.metrics.push(

            metric

        );



        return metric;

    }





    measureImpact(data) {


        const impact = {


            impactId:

                "IMP-" + Date.now(),


            knowledgeId:

                data.knowledgeId,


            domain:

                data.domain || "GENERAL",


            adoptionScore:

                data.adoptionScore || 0,


            innovationScore:

                data.innovationScore || 0,


            socialScore:

                data.socialScore || 0,


            economicScore:

                data.economicScore || 0,


            overallScore:

                Math.round(

                    (

                    data.adoptionScore +

                    data.innovationScore +

                    data.socialScore +

                    data.economicScore

                    ) / 4

                ),


            status:

                "MEASURED",


            createdAt:

                new Date().toISOString()


        };



        this.impacts.push(

            impact

        );



        AuditService.record(

            "KNOWLEDGE_IMPACT_MEASURED",

            impact

        );



        return impact;

    }





    recordAdoption(data) {


        const adoption = {


            adoptionId:

                "ADOPT-" + Date.now(),


            knowledgeId:

                data.knowledgeId,


            adopter:

                data.adopter,


            type:

                data.type,


            timestamp:

                new Date().toISOString()


        };



        this.adoptions.push(

            adoption

        );



        return adoption;

    }





    recordOutcome(data) {


        const outcome = {


            outcomeId:

                "OUT-" + Date.now(),


            knowledgeId:

                data.knowledgeId,


            description:

                data.description,


            measurableResult:

                data.result,


            timestamp:

                new Date().toISOString()


        };



        this.outcomes.push(

            outcome

        );



        return outcome;

    }





    analyzeImpact(knowledgeId) {


        return {


            impact:

                this.impacts.filter(

                    item =>

                    item.knowledgeId === knowledgeId

                ),


            adoption:

                this.adoptions.filter(

                    item =>

                    item.knowledgeId === knowledgeId

                ),


            outcomes:

                this.outcomes.filter(

                    item =>

                    item.knowledgeId === knowledgeId

                )


        };

    }





    registerDefaultMetrics() {


        this.registerMetric({

            name:

                "Knowledge Adoption Rate",

            category:

                "ADOPTION",

            weight:

                30

        });



        this.registerMetric({

            name:

                "Innovation Contribution",

            category:

                "INNOVATION",

            weight:

                30

        });



        this.registerMetric({

            name:

                "Social Value",

            category:

                "SOCIAL",

            weight:

                20

        });



        this.registerMetric({

            name:

                "Economic Value",

            category:

                "ECONOMIC",

            weight:

                20

        });


    }





    status() {


        return {


            initialized:

                this.initialized,


            impacts:

                this.impacts.length,


            metrics:

                this.metrics.length,


            adoptions:

                this.adoptions.length,


            outcomes:

                this.outcomes.length


        };

    }


}



window.KnowledgeImpactManagementService =

    new KnowledgeImpactManagementService();



Object.freeze(

    window.KnowledgeImpactManagementService

);
