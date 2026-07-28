/*
====================================================
SKOS Mission Control

Knowledge Assistant Engine

BUILD-000365

Version:
1.0

Status:
ACTIVE
====================================================
*/

const KnowledgeAssistantEngine = {

    async initialize() {

        Logger.info(
            "Knowledge Assistant Engine Initializing..."
        );

        return true;

    },

    async ask(question) {

        Logger.info(
            "Assistant Question: " + question
        );

        const searchResults =
            await KnowledgeQueryEngine.query(question);

        const reasoning =
            await ReasoningEngine.reason(question);

        const recommendations =
            await RecommendationEngine.recommend(question, 5);

        return this.buildResponse(

            question,

            searchResults,

            reasoning,

            recommendations

        );

    },

    buildResponse(

        question,

        searchResults,

        reasoning,

        recommendations

    ) {

        return {

            question,

            timestamp:
                new Date().toISOString(),

            search: searchResults,

            reasoning: reasoning,

            recommendations: recommendations,

            summary:
                this.generateSummary(

                    searchResults,

                    recommendations

                )

        };

    },

    generateSummary(

        searchResults,

        recommendations

    ) {

        if (

            searchResults.length === 0

        ) {

            return

                "No matching knowledge object found.";

        }

        return {

            foundObjects:

                searchResults.length,

            recommendedObjects:

                recommendations.length

        };

    },

    async explain(objectId) {

        return await ReasoningEngine.explain(
            objectId
        );

    },

    async related(objectId) {

        return await RecommendationEngine.related(
            objectId
        );

    },

    status() {

        return "READY";

    }

};

window.KnowledgeAssistantEngine =
    KnowledgeAssistantEngine;

Object.freeze(
    KnowledgeAssistantEngine);
